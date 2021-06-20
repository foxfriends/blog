const { defineConfig } = require('vite');
const { resolve } = require('path');
const { svelte } = require('@sveltejs/vite-plugin-svelte');

module.exports = defineConfig({
  plugins: [svelte()],
  rollupDedupe: ['svelte'],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
});
