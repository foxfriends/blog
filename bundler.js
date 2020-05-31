const Bundler = require('parcel-bundler');
const Path = require('path');
const compileArticles = require('./compile-articles');
const Hs = require('http-server');

// Single entrypoint file location:
const entryFiles = [
  './index.html',
  './404.html',
  './article/*/index.html',
]

// Bundler options
const options = {
  watch: process.env.NODE_ENV !== 'production',
};

(async function() {
  compileArticles();
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);
  bundler.addAssetType('svx', require.resolve('parcel-plugin-svelte/lib/svelte-asset.js'));
  bundler.on('buildStart', () => compileArticles());
  await bundler.bundle();
  if (process.env.NODE_ENV !== 'production') {
    const server = new Hs.HttpServer({ root: './dist', cache: -1 });
    server.listen(1234);
  }
})();
