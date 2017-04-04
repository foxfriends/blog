'use strict';
import React from 'react';
import Remarkable from 'remarkable';
import Prism from 'prismjs';
import aside from './aside';
import { escapeHtml, unescapeMd, replaceEntities } from 'remarkable/lib/common/utils';
import './prism';
import './markdown.scss';

const md = new Remarkable({
  html:         false,
  xhtmlOut:     true,
  breaks:       false,
  langPrefix:   'language-',
  linkify:      false,

  typographer:  true,
  quotes:       '“”‘’',
  highlight: (str, lang) => Prism.highlight(str, Prism.languages[lang])
});

md.block.ruler.enable([
  'footnote',
  'deflist'
]);
md.inline.ruler.enable([
  'footnote_inline'
]);
md.use(aside);

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    md.renderer.rules.image = (tokens, idx, options) => {
      let src = escapeHtml(tokens[idx].src);
      if(/^https?:\/\//.test(src)) {
        src = `src="${src}"`;
      } else {
        src = `src="/articles/${this.props.interpolation.link}/${src}"`
      }
      let title = tokens[idx].title ? `title="${escapeHtml(replaceEntities(tokens[idx].title))}"` : '';
      let alt = `alt="${tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : ''}"`;
      let suffix = options.xhtmlOut ? ' /' : '';
      return `<img ${src} ${alt} ${title} ${suffix}>`;
    }
    this.rendered = md.render(this.props.children.replace(/\{\{\s+[\S]+\s+\}\}/g, str => {
      return this.props.interpolation[str.match(/\{\{\s+([\S]+)\s+\}\}/)[1]] || str;
    }));
  }

  render() {
    return (
      <div className="markdown" dangerouslySetInnerHTML={{ __html: this.rendered }} />
    )
  }
}

export default Markdown;
