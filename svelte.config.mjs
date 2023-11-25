import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { resolve } from "path";
import AtoH from "ansi-to-html";
import { mdsvex } from "mdsvex";
import math from "remark-math";
import containers from "remark-containers";
import deflist from "remark-deflist";
import katex from "rehype-katex";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const atoh = new AtoH({
  fg: "var(--color__code--text)",
  bg: "var(--color__code--background)",
  newline: false,
  escapeXML: true,
  colors: [
    "var(--color__code--black)",
    "var(--color__code--red)",
    "var(--color__code--green)",
    "var(--color__code--yellow)",
    "var(--color__code--blue)",
    "var(--color__code--magenta)",
    "var(--color__code--cyan)",
    "var(--color__code--white)",
    "var(--color__code--brblack)",
    "var(--color__code--brred)",
    "var(--color__code--brgreen)",
    "var(--color__code--bryellow)",
    "var(--color__code--brblue)",
    "var(--color__code--brmagenta)",
    "var(--color__code--brcyan)",
    "var(--color__code--brwhite)",
  ],
});

export default {
  extensions: ["svelte", "svx"],
  preprocess: mdsvex({
    extension: ".svx",
    remarkPlugins: [math, containers, deflist],
    rehypePlugins: [katex],
    layout: resolve(__dirname, "./src/app/Article.svelte"),
    smartypants: {
      quotes: true,
      ellipses: true,
      backticks: false,
      dashes: "oldschool",
    },
    highlight: {
      highlighter(source, language) {
        let { stdout } = spawnSync("syncat", ["-l", language], {
          input: source,
          encoding: "UTF-8",
        });
        if (!stdout) {
          stdout = source;
        }
        const result = `<pre><code data-language='${language}' class='language-${language}'>${atoh.toHtml(
          stdout
        )}</code></pre>`;
        return result.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
      },
    },
  }),
};
