const { mdsvex } = require('mdsvex');
const Path = require('path');

module.exports = {
  preprocess: mdsvex({
    parser: md => md
      .use(require('markdown-it-deflist')),
    extension: '.svexy',
    layout: '../../src/app/Article.svelte',
    markdownOptions: {
      typographer: true,
      // TODO: highlight using syncat??
    },
  }),
};
