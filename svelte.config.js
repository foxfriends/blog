const Cp = require('child_process');
const Path = require('path');
const AtoH = require('ansi-to-html');
const { mdsvex } = require('mdsvex');

const atoh = new AtoH({
  fg: 'var(--color__code--text)',
  bg: 'var(--color__code--background)',
  newline: false,
  escapeXML: true,
  colors: [
    'var(--color__code--black)',
    'var(--color__code--red)',
    'var(--color__code--green)',
    'var(--color__code--yellow)',
    'var(--color__code--blue)',
    'var(--color__code--magenta)',
    'var(--color__code--cyan)',
    'var(--color__code--white)',
    'var(--color__code--brblack)',
    'var(--color__code--brred)',
    'var(--color__code--brgreen)',
    'var(--color__code--bryellow)',
    'var(--color__code--brblue)',
    'var(--color__code--brmagenta)',
    'var(--color__code--brcyan)',
    'var(--color__code--brwhite)',
  ],
});

module.exports = {
  preprocess: mdsvex({
    parser: md => md
      .use(require('markdown-it-deflist')),
    extension: '.svexy',
    layout: '../../src/app/Article.svelte',
    markdownOptions: {
      typographer: true,
      highlight(source, language) {
        const { stdout } = Cp.spawnSync('syncat', ['-l', language], {
          input: source,
          encoding: 'UTF-8',
        });
        return atoh.toHtml(stdout);
      },
    },
  }),
};
