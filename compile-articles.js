const Path = require('path');
const Fs = require('fs');
const fm = require('front-matter');

const html = article => `<!DOCTYPE HTML>
<html>
  <head>
    <title>Cam Eldridge | ${article.title}</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset='UTF-8' />
    <script src='./index.js' defer></script>
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Spectral+SC:wght@400;500&family=Vollkorn:wght@400;500;600&family=Vollkorn+SC&display=swap" rel="stylesheet" />
    <style>
      @import '../../vendor/cameldridge/src/base.css';
      @import '../../vendor/cameldridge/src/fonts.css';
      @import '../../vendor/cameldridge/src/variables.css';
    </style>
  </head>
  <body></body>
</html>
`;

const js = id => `import Article from './article.svx';
const app = new Article({ target: document.body });
`;

function equal(a, b) {
  if (a === b) { return true; }
  if (a instanceof Date || b instanceof Date) {
    if (a instanceof Date && b instanceof Date) {
      return a.valueOf() === b.valueOf();
    }
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((ai, i) => equal(ai, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const akeys = Object.keys(a).sort();
    const bkeys = Object.keys(b).sort();
    return equal(akeys, bkeys) && akeys.every((i) => equal(a[i], b[i]));
  }
  return false;
}

function dater(key, value) {
  if (key === 'date') { return new Date(value); }
  return value;
}

module.exports = function compileArticles(force = false) {
  const articles = [];
  const dir = Fs.readdirSync('./article/');
  let previousManifest = {};
  if (Fs.existsSync('./article/manifest.json')) {
    previousManifest = JSON.parse(Fs.readFileSync('./article/manifest.json'), dater);
  }

  for (const id of dir) {
    if (id === 'manifest.json') continue;
    const article = Fs.readFileSync(`./article/${id}/article.svx`).toString();
    const { attributes } = fm(article);
    attributes.id = id;
    if (!equal(attributes, previousManifest.find((entry) => entry.id === id))) {
      console.log(`Replacing article ${id}`);
      Fs.writeFileSync(`./article/${id}/index.html`, html(attributes));
      Fs.writeFileSync(`./article/${id}/index.js`, js(id));
    }
    articles.push(attributes);
  }

  articles.sort((a, b) => new Date(a.date) < new Date(b.date));
  if (!equal(previousManifest, articles)) {
    console.log('Replacing manifest');
    Fs.writeFileSync('./article/manifest.json', JSON.stringify(articles));
  }
};
