'use strict';
import React from 'react';
import Remarkable from 'remarkable';
import Prism from 'prismjs';
import aside from './aside';
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
  highlight: (str, lang) =>
    `<pre class='language-${lang}'><code class='block language-${lang}'>` +
    `${Prism.highlight(str, Prism.languages[lang])}` +
    `</code></pre>`
});

md.block.ruler.enable([
  'deflist'
]);

md.use(aside);

class Markdown extends React.Component {
  rendered = md.render(this.props.children.replace(/\{\{\s+[\S]+\s+\}\}/g, str => {
    return this.props.interpolation[str.match(/\{\{\s+([\S]+)\s+\}\}/)[1]] || str;
  }));

  render() {
    return (
      <div className="markdown" dangerouslySetInnerHTML={{ __html: this.rendered }} />
    )
  }
}

export default Markdown;
