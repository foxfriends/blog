<script>
  import Paper from '../../vendor/cameldridge/src/component/Paper.svelte';
  import Text from '../../vendor/cameldridge/src/component/Text.svelte';
  import Content from '../component/Content.svelte';
  export let tags, date, author;
  $: dateObject = new Date(date);

  function format(date) {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  }
</script>

<div class='meta'>
  <Paper>
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
  </Paper>
</div>

<div class='article'>
  <Paper>
    <Content>
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

  .meta {
    font-size: 1.15rem;
    width: 60rem;
    margin: 0 auto;
    margin-top: 5rem;
    font-variant-numeric: tabular-nums;
  }

  .meta-content {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 1rem 10rem;
  }

  .meta-head {
    text-transform: lowercase;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .meta-value {
    margin-right: 1rem;
  }
</style>
