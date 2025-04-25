import { spawnSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

import fm from "front-matter";

const { pipeline, env } = await import("@huggingface/transformers");
env.allowLocalModels = false;
env.cacheDir = ".cache";

const html = (article) => `<!DOCTYPE HTML>
<html>
  <head>
    <title>Cam Eldridge | ${article.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <script type="module" src="./index.js" defer></script>
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Spectral+SC:wght@400;500&family=Vollkorn:wght@400;500;600&family=Vollkorn+SC&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="scattered-papers/papers.css" />
    <link rel="stylesheet" href="../../fonts.css" />
  </head>
  <body></body>
</html>
`;

const js = (id) => `import { mount } from "svelte";
import Article from "./article.svx";
const app = mount(Article, { target: document.body });
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

export async function compileArticles(force = false) {
  const embed = await pipeline("feature-extraction", "intfloat/e5-small-v2", {
    dtype: "fp32",
    subfolder: "",
  });

  const articles = [];
  const dir = await readdir("./article/");
  let previousManifest = [];
  if (existsSync("./article/manifest.json")) {
    previousManifest = JSON.parse(
      await readFile("./article/manifest.json", "utf8"),
      dater,
    );
  }

  for (const id of dir) {
    if (id === "manifest.json") continue;
    if (id === ".DS_Store") continue; // bruh
    const article = await readFile(`./article/${id}/article.svx`, "utf8");
    const { attributes, body } = fm(article);
    attributes.id = id;
    const existing = previousManifest.find((entry) => entry.id === id);

    let embedding = existing?.embedding;
    if (existing) delete existing.embedding;

    if (!existing || !embedding || !equal(attributes, existing)) {
      console.log(`Replacing article ${id}`);
      [, , embedding] = await Promise.all([
        writeFile(`./article/${id}/index.html`, html(attributes)),
        writeFile(`./article/${id}/index.js`, js(id)),
        embed(`query: ${body}`, {
          pooling: "mean",
          normalize: true,
        }),
      ]);
      embedding = embedding.tolist()[0];
    }
    if (attributes.outline) {
      for (const { language, output } of attributes.outline) {
        const input = await readFile(`./article/${id}/article.svx`, "utf8");
        const { stdout: tangle } = spawnSync("outline", ["-l", language], {
          input,
        });
        const filename = output || `article.${language}`;
        const previous = existsSync(`./article/${id}/${output}`)
          ? await readFile(`./article/${id}/${output}`)
          : Buffer.from("");
        if (Buffer.compare(previous, tangle) !== 0) {
          await writeFile(`./article/${id}/${output}`, tangle);
        }
      }
    }
    articles.push({ ...attributes, embedding });
  }

  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (!equal(previousManifest, articles)) {
    console.log("Replacing manifest");
    await writeFile("./article/manifest.json", JSON.stringify(articles));
  }
}
