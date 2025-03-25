import { promisify } from "node:util";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";
import glob from "glob";
import { compileArticles } from "./compile-articles.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function entryFiles() {
  const articles = await promisify(glob)("./article/*/index.html");
  return {
    home: resolve(__dirname, "./index.html"),
    404: resolve(__dirname, "./404.html"),
    ...Object.fromEntries(
      articles.map((file) => {
        const [, name] = file.match(/\.\/article\/([^\/]+)\/index\.html/);
        return [name, resolve(__dirname, file)];
      })
    ),
  };
}

async function config() {
  return {
    build: {
      rollupOptions: {
        input: await entryFiles(),
      },
    },
  };
}

async function build() {
  await compileArticles();
  await vite.build(await config());
}

async function dev() {
  compileArticles();
  const server = await vite.createServer(await config());
  await server.listen();
}

switch (process.argv[2]) {
  case "build":
    await build();
    break;
  default:
    await dev();
    break;
}
