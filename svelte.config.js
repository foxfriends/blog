const { mdsvex } = require('mdsvex');
const Path = require('path');

const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
require('prismjs/plugins/autoloader/prism-autoloader');
require('prismjs/plugins/line-numbers/prism-line-numbers');
require('prismjs/plugins/line-highlight/prism-line-highlight');

module.exports = {
  preprocess: mdsvex({
    parser: md => md
      .use(require('markdown-it-deflist')),
    extension: '.svexy',
    layout: '../../src/app/Article.svelte',
    markdownOptions: {
      typographer: true,
      highlight: (source, language) => {
        loadLanguages([language]);
        return Prism.highlight(source, Prism.languages[language], language);
      },
    },
  }),
};
