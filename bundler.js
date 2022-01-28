const { promisify } = require('util');
const path = require('path');
const vite = require('vite');
const glob = require('glob');
const compileArticles = require('./compile-articles');

async function entryFiles() {
  const articles = await promisify(glob)('./article/*/index.html');
  return {
    home: path.resolve(__dirname, './index.html'),
    404: path.resolve(__dirname, './404.html'),
    ...Object.fromEntries(articles.map((file) => {
      const [, name] = file.match(/\.\/article\/([^\/]+)\/index\.html/);
      return [name, path.resolve(__dirname, file)];
    })),
  };
}

async function config() {
  return {
    build: {
      rollupOptions: {
        input: await entryFiles(),
      }
    },
  }
}

async function build() {
  compileArticles();
  await vite.build(await config());
}

async function dev() {
  compileArticles();
  const server = await vite.createServer(await config());
  await server.listen();
}

switch (process.argv[2]) {
  case 'build': build(); break;
  default: dev(); break;
}
