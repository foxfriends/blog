<script>
  import Paper from "scattered-papers/Paper.svelte";
  import Text from "scattered-papers/Text.svelte";
  import Image from "scattered-papers/Image.svelte";
  import Link from "scattered-papers/Link.svelte";
  import Content from "scattered-papers/Content.svelte";
  import { BLOG_TITLE } from "../constants";
  import ARTICLES from "../../article/manifest.json";
  ARTICLES.sort((a, b) => new Date(a.date) - new Date(b.date));

  export let tags, date, author, title, subtitle;

  $: dateObject = new Date(date);
  $: nextArticle = ARTICLES.find(
    (article) => new Date(article.date) > dateObject,
  );
  $: prevArticle = [...ARTICLES]
    .reverse()
    .find((article) => new Date(article.date) < dateObject);

  function format(date) {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  }
</script>

<div class="navigation">
  <Paper>
    <nav class="nav-content">
      <div class="nav-item left">
        {#if prevArticle}
          <Link href="/article/{prevArticle.id}/">
            <div class="link">
              <span class="link-icon">
                <Image name="arrow-left" alt="Previous article" />
              </span>
              <span class="link-text">
                <Text>{prevArticle.title}</Text>
              </span>
            </div>
          </Link>
        {/if}
      </div>
      <div class="nav-item center">
        <Link href="/">
          <div class="link">
            <Text accent>{BLOG_TITLE}</Text>
          </div>
        </Link>
      </div>
      <div class="nav-item right">
        {#if nextArticle}
          <Link href="/article/{nextArticle.id}/">
            <div class="link">
              <span class="link-text">
                <Text>{nextArticle.title}</Text>
              </span>
              <span class="link-icon">
                <Image name="arrow-right" alt="Next article" />
              </span>
            </div>
          </Link>
        {/if}
      </div>
    </nav>
  </Paper>
</div>

<div class="article">
  <Paper>
    <Content>
      <div class="meta">
        {#if title}
          <h1>{title}</h1>
        {/if}
        {#if subtitle}
          <h2>{subtitle}</h2>
        {/if}
        {#if title || subtitle}
          <hr class="heading-separator" />
        {/if}
        <div class="meta-content">
          {#if author}
            <div class="meta-item">
              <span class="meta-head">
                <Text accent>By</Text>
              </span>
              <span class="meta-value">
                <Text semibold>{author}</Text>
              </span>
            </div>
          {/if}
          {#if dateObject}
            <div class="meta-item">
              <span class="meta-head">
                <Text accent>On</Text>
              </span>
              <span class="meta-value">
                <Text semibold>{format(dateObject)}</Text>
              </span>
            </div>
          {/if}
          {#if tags && tags.length}
            <div class="meta-item">
              <span class="meta-head">
                <Text accent>Tagged</Text>
              </span>
              <span class="meta-value tags">
                {#each tags as tag}
                  <span class="tag">
                    <Text semibold>#{tag}</Text>
                  </span>
                {/each}
              </span>
            </div>
          {/if}
        </div>
      </div>
      <slot />
    </Content>
  </Paper>
</div>

<style>
  .article {
    position: relative;
    margin: 1rem auto;
    width: 60rem;
    font-size: 1.15rem;
    font-variant-numeric: proportional-nums;
    max-width: calc(100vw - 2rem);

    --font-sub-display: "Vollkorn SC", sans-serif;
    --font-size-title: 1.75em;
    --font-size-subtitle: 1.1em;
    --font-size-heading: 1.25em;
    --font-size-subheading: 1.05em;
    --font-size-body: 1em;
    --font-size-note: 0.9em;

    --color__code--black: #282c34;
    --color__code--brblack: #3e4452;
    --color__code--red: #e06c75;
    --color__code--brred: #be5046;
    --color__code--green: #98c378;
    --color__code--brgreen: #98c379;
    --color__code--yellow: #e5c07b;
    --color__code--bryellow: #d19a66;
    --color__code--blue: #61afef;
    --color__code--brblue: #61afef;
    --color__code--magenta: #c678dd;
    --color__code--brmagenta: #c678dd;
    --color__code--cyan: #56b6c2;
    --color__code--brcyan: #56b6c2;
    --color__code--white: #abb2bf;
    --color__code--brwhite: #5c6370;

    --color__code--background: var(--color__code--black);
    --color__code--text: var(--color__code--white);
  }

  .meta {
    padding: 0 10rem;
  }

  .navigation {
    font-size: 1.15rem;
    width: 60rem;
    margin: 0 auto;
    margin-top: 5rem;
    font-variant-numeric: tabular-nums;
    max-width: calc(100vw - 2rem);
  }

  .nav-content {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    padding: 1rem 5rem;
  }

  @media (max-width: 51rem) {
    .article {
      --Content--outer-space: 2rem;
    }

    .meta {
      padding: 0 2rem;
    }

    .nav-content {
      padding: 1rem 2rem;
    }
  }

  .nav-item {
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    align-items: center;
    min-width: 0;
  }

  .nav-item :global(a) {
    /** This is a bit of a hack to get the ellipsis to work... but it worked */
    max-width: 100%;
  }

  .nav-item.left {
    justify-content: flex-start;
  }
  .nav-item.right {
    justify-content: flex-end;
    text-align: end;
  }
  .nav-item.center {
    justify-content: center;
    text-align: center;
  }

  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .link-icon {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
  }

  .link-text + .link-icon,
  .link-icon + .link-text {
    margin-left: 0.5rem;
  }

  .link-text {
    flex-basis: 0;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transform: translateY(2px);
  }

  .meta-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 1rem;
    margin: 0 2rem 4rem 2rem;
  }

  .meta-item {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
  }

  .meta-head {
    text-transform: lowercase;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 0 1rem;
    flex-wrap: wrap;
  }

  .heading-separator {
    border: none;
    width: calc(100% + 4rem) !important;
    margin-left: -2rem;
    height: 1px;
  }
</style>
