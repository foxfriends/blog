'use strict';

function aside(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine], currentLine = startLine;
  if (pos > max) { return false; }

  // check the aside marker (two slashes)
  if (state.src.charCodeAt(pos++) !== 0x2F) { return false; }
  if (state.src.charCodeAt(pos++) !== 0x2F) { return false; }
  // skip one optional space after '//'
  if (state.src.charCodeAt(pos) === 0x20) { pos++; }

  // we know that it's going to be a valid aside,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true; }
  while(state.src.substring(state.bMarks[currentLine] + state.tShift[currentLine], state.eMarks[currentLine]).substr(0, 2) === '//' && currentLine < endLine) {
    ++currentLine;
  }

  state.tokens.push({
    type: 'aside_open',
    lines: [ startLine, currentLine - 1]
  });
  state.tokens.push({
    type: 'aside_content',
    content: state.getLines(startLine, currentLine, 0, false)
  });
  state.tokens.push({
    type: 'aside_close'
  });

  state.line = currentLine;

  return true;
}

export default function(md) {
  md.block.ruler.before('blockquote', 'aside', aside);
  md.renderer.rules['aside_open'] = () => '<aside>\n';
  md.renderer.rules['aside_content'] = (tokens, index) => tokens[index].content.split('\n').map(l => l.substr(2)).join('\n');
  md.renderer.rules['aside_close'] = (tokens, index) => '</aside>' + md.renderer.getBreak(tokens, index);
}
