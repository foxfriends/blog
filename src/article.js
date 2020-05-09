import App from './app/Article.svelte';

const app = new App({
    target: document.body,
    props: { article: window.article },
});
