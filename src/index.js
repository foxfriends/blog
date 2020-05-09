import App from './app/Index.svelte';

const app = new App({
    target: document.body,
    props: { articles: window.articles },
});
