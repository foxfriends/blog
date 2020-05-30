<script>
  import Paper from '../../vendor/cameldridge/src/component/Paper.svelte';
  import Text from '../../vendor/cameldridge/src/component/Text.svelte';
  import Image from '../../vendor/cameldridge/src/component/Image.svelte';
  import Link from '../../vendor/cameldridge/src/component/Link.svelte';
  import Content from '../component/Content.svelte';
  import { BLOG_TITLE } from '../constants';
  import ARTICLES from '../../article/manifest.json';
  ARTICLES.sort((a, b) => new Date(a.date) - new Date(b.date));

  export let tags, date, author, title, subtitle;

  $: dateObject = new Date(date);
  $: nextArticle = ARTICLES.find((article) => new Date(article.date) > dateObject);
  $: prevArticle = [...ARTICLES].reverse().find((article) => new Date(article.date) < dateObject);

  function format(date) {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  }
</script>

<div class='navigation'>
  <Paper>
    <nav class='nav-content'>
      <div class='nav-item left'>
        {#if prevArticle}
          <Link href='/article/{prevArticle.id}'>
            <div class='link'>
              <span class='link-icon'>
                <Image name='arrow-left' alt='Previous article' />
              </span>
              <span class='link-text'>
                <Text accent>{prevArticle.title}</Text>
              </span>
            </div>
          </Link>
        {/if}
      </div>
      <div class='nav-item center'>
        <Link href='/'>
          <div class='link'>
            <Text accent>{BLOG_TITLE}</Text>
          </div>
        </Link>
      </div>
      <div class='nav-item right'>
        {#if nextArticle}
          <Link href='/article/{nextArticle.id}'>
            <div class='link'>
              <span class='link-text'>
                <Text accent>{nextArticle.title}</Text>
              </span>
              <span class='link-icon'>
                <Image name='arrow-right' alt='Next article' />
              </span>
            </div>
          </Link>
        {/if}
      </div>
    </nav>
  </Paper>
</div>

<div class='article'>
  <Paper>
    <Content>
      {#if title}
        <h1>{title}</h1>
      {/if}
      {#if subtitle}
        <h2>{subtitle}</h2>
      {/if}
      {#if title || subtitle}
        <hr class='heading-separator' />
      {/if}
      <div class='meta-content'>
        {#if author}
          <span class='meta-head'>
            <Text accent>By</Text>
          </span>
          <span class='meta-value'>
            <Text semibold>{author}</Text>
          </span>
        {/if}
        {#if dateObject}
          <span class='meta-head'>
            <Text accent>On</Text>
          </span>
          <span class='meta-value'>
            <Text semibold>{format(dateObject)}</Text>
          </span>
        {/if}
        {#if tags.length}
          <span class='meta-head'>
            <Text accent>Tagged</Text>
          </span>
          <span class='meta-value'>
            {#each tags as tag}
              <span class='tag'>
                <Text semibold>#{tag}</Text>
              </span>
            {/each}
          </span>
        {/if}
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

    --font-sub-display: 'Vollkorn SC', sans-serif;
    --font-size-title: 1.75em;
    --font-size-subtitle: 1.1em;
    --font-size-heading: 1.25em;
    --font-size-subheading: 1.05em;
    --font-size-body: 1em;
    --font-size-note: 0.9em;

    --color__code--black: #282C34;
    --color__code--brblack: #3E4452;
    --color__code--red: #E06C75;
    --color__code--brred: #BE5046;
    --color__code--green: #98C378;
    --color__code--brgreen: #98C379;
    --color__code--yellow: #E5C07B;
    --color__code--bryellow: #D19A66;
    --color__code--blue: #61AFEF;
    --color__code--brblue: #61AFEF;
    --color__code--magenta: #C678DD;
    --color__code--brmagenta: #C678DD;
    --color__code--cyan: #56B6C2;
    --color__code--brcyan: #56B6C2;
    --color__code--white: #ABB2BF;
    --color__code--brwhite: #5C6370;

    --color__code--background: var(--color__code--black);
    --color__code--text: var(--color__code--white);
  }

  .navigation {
    font-size: 1.15rem;
    width: 60rem;
    margin: 0 auto;
    margin-top: 5rem;
    font-variant-numeric: tabular-nums;
  }

  .nav-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 8.5rem;
  }

  .nav-item {
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
  }

  .nav-item.left { justify-content: flex-start; }
  .nav-item.right { justify-content: flex-end; }
  .nav-item.center { justify-content: center; }

  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .link-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .link-text + .link-icon,
  .link-icon + .link-text {
    margin-left: 0.5rem;
  }

  .link-text {
    text-transform: lowercase;
  }

  .meta-content {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin: 0 2rem 4rem 2rem;
  }

  .meta-head {
    text-transform: lowercase;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .meta-value {
    margin-right: 1rem;
  }

  .heading-separator {
    border: none;
    width: calc(100% + 4rem) !important;
    margin-left: -2rem;
    height: 1px;
    background-image: linear-gradient(to right, black, rgba(0, 0, 0, 0.2));
  }
</style>
