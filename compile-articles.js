const Path = require('path');
const Fs = require('fs');
const fm = require('front-matter');
const rimraf = require('rimraf');

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

module.exports = function compileArticles() {
  if (Fs.existsSync('./article/manifest.json')) {
    Fs.unlinkSync('./article/manifest.json');
  }
  const articles = [];
  const dir = Fs.readdirSync('./article/');
  for (const id of dir) {
    const article = Fs.readFileSync(`./article/${id}/article.svx`).toString();
    const { attributes } = fm(article);
    Fs.writeFileSync(`./article/${id}/index.html`, html(attributes));
    Fs.writeFileSync(`./article/${id}/index.js`, js(id));
    articles.push({ ...attributes, id });
  }

  articles.sort((a, b) => new Date(a.date) < new Date(b.date));
  Fs.writeFileSync('./article/manifest.json', JSON.stringify(articles));
}
