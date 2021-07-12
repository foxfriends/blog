<script>
  import { createEventDispatcher } from 'svelte';
  import Paper from 'scattered-papers/Paper.svelte';
  import Text from 'scattered-papers/Text.svelte';
  import Link from 'scattered-papers/Link.svelte';
  export let tags, title, subtitle, date, id;

  const dispatcher = createEventDispatcher();

  function fmt(dateStr) {
    const date = new Date(dateStr);
    const year = `${date.getUTCFullYear()}`;
    const month = `${date.getUTCMonth()+1}`.padStart(2, 0);
    const day = `${date.getUTCDate()}`.padStart(2, 0);
    return `${year}/${month}/${day}`;
  }
</script>

<div class='summary'>
  <Paper>
    <div class='content'>
      <div class='titles'>
        <div class='title'>
          <Link href="/article/{id}/">
            <Text heading>
              { title }
            </Text>
          </Link>
        </div>
        {#if subtitle}
          <div class='subtitle'>
            <Text accent>
              { subtitle }
            </Text>
          </div>
        {/if}
      </div>
      {#if tags}
        <div class='tags'>
          {#each tags as tag}
            <div class='tag'>
              <Link on:click={() => dispatcher('filter', { tag })}>
                <Text>#{tag}</Text>
              </Link>
            </div>
          {/each}
        </div>
      {/if}
      <div class='date'>
        <Text mono>{ fmt(date) }</Text>
      </div>
    </div>
  </Paper>
</div>

<style>
  .summary {
    width: 50rem;
    height: 6rem;
    margin-bottom: 1rem;
  }

  .content {
    box-sizing: border-box;
    height: 100%;
    padding: 1rem;
    display: grid;
    align-items: center;
    justify-items: flex-start;
    grid-template-areas:
      "t t t h h"
      "t t t d d";
  }

  .titles {
    grid-area: t;
    line-height: 1.3;
  }

  .title {
    font-size: var(--font-size-heading);
  }

  .subtitle {
    color: var(--color-ink-light);
    font-size: var(--font-size-note);
    text-transform: lowercase;
    text-indent: 1em;
  }

  .tags {
    display: flex;
    justify-self: flex-end;
    justify-content: flex-end;

    font-size: var(--font-size-note);
    grid-area: h;
  }

  .tag {
    margin-left: 1rem;
  }

  .date {
    font-size: var(--font-size-note);
    grid-area: d;
    text-align: right;
    justify-self: flex-end;
  }
</style>
