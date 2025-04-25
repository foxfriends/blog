import { mount } from "svelte";
import App from "./app/Index.svelte";
import articles from "../article/manifest.json";

const app = mount(App, {
  target: document.body,
  props: { articles },
});
