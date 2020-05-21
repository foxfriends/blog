const Path = require('path');
const { mdsvex } = require('mdsvex');

module.exports = {
  preprocess: mdsvex({
    extension: '.svexy',
    layout: '../../src/app/Article.svelte',
    markdownOptions: {
      typographer: true,
    }
  }),
};
