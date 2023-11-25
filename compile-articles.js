import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import fm from "front-matter";

const html = (article) => `<!DOCTYPE HTML>
<html>
  <head>
    <title>Cam Eldridge | ${article.title}</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta charset='UTF-8' />
    <script type='module' src='./index.js' defer></script>
    <link rel='preconnect' href='https://fonts.gstatic.com/' crossorigin />
    <link href='https://fonts.googleapis.com/css2?family=Spectral+SC:wght@400;500&family=Vollkorn:wght@400;500;600&family=Vollkorn+SC&display=swap' rel='stylesheet' />
    <link rel='stylesheet' href='scattered-papers/papers.css' />
    <link rel='stylesheet' href='../../fonts.css' />
  </head>
  <body></body>
</html>
`;

const js = (id) => `import Article from './article.svx';
const app = new Article({ target: document.body });
`;

function equal(a, b) {
  if (a === b) return true;
  if (a instanceof Date || b instanceof Date) {
    if (a instanceof Date && b instanceof Date) {
      return a.valueOf() === b.valueOf();
    }
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((ai, i) => equal(ai, b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    if (a === null && b !== null) return false;
    if (b === null && a !== null) return false;
    const akeys = Object.keys(a).sort();
    const bkeys = Object.keys(b).sort();
    return equal(akeys, bkeys) && akeys.every((i) => equal(a[i], b[i]));
  }
  return false;
}

function dater(key, value) {
  if (key === "date") return new Date(value);
  return value;
}

export function compileArticles(force = false) {
  const articles = [];
  const dir = readdirSync("./article/");
  let previousManifest = [];
  if (existsSync("./article/manifest.json")) {
    previousManifest = JSON.parse(
      readFileSync("./article/manifest.json"),
      dater
    );
  }

  for (const id of dir) {
    if (id === "manifest.json") continue;
    const article = readFileSync(`./article/${id}/article.svx`).toString();
    const { attributes } = fm(article);
    attributes.id = id;
    if (
      !equal(
        attributes,
        previousManifest.find((entry) => entry.id === id)
      )
    ) {
      console.log(`Replacing article ${id}`);
      writeFileSync(`./article/${id}/index.html`, html(attributes));
      writeFileSync(`./article/${id}/index.js`, js(id));
    }
    if (attributes.outline) {
      for (const { language, output } of attributes.outline) {
        const input = readFileSync(`./article/${id}/article.svx`);
        const { stdout: tangle } = spawnSync("outline", ["-l", language], {
          input,
        });
        const filename = output || `article.${language}`;
        const previous = existsSync(`./article/${id}/${output}`)
          ? readFileSync(`./article/${id}/${output}`)
          : Buffer.from("");
        if (Buffer.compare(previous, tangle) !== 0) {
          writeFileSync(`./article/${id}/${output}`, tangle);
        }
      }
    }
    articles.push(attributes);
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (!equal(previousManifest, articles)) {
    console.log("Replacing manifest");
    writeFileSync("./article/manifest.json", JSON.stringify(articles));
  }
}
