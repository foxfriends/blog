import App from './app/Index.svelte';
import articles from '../article/manifest.json';

const app = new App({
    target: document.body,
    props: { articles },
});
