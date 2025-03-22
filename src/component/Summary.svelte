<script>
  import { createEventDispatcher } from "svelte";
  import Paper from "scattered-papers/Paper.svelte";
  import Text from "scattered-papers/Text.svelte";
  import Link from "scattered-papers/Link.svelte";
  export let tags, title, subtitle, date, id;

  const dispatcher = createEventDispatcher();

  function fmt(dateStr) {
    const date = new Date(dateStr);
    const year = `${date.getUTCFullYear()}`;
    const month = `${date.getUTCMonth() + 1}`.padStart(2, 0);
    const day = `${date.getUTCDate()}`.padStart(2, 0);
    return `${year}/${month}/${day}`;
  }
</script>

<div class="summary">
  <Paper>
    <div class="content">
      <div class="titles">
        <div class="title">
          <Link href="/article/{id}/">
            <Text heading>
              {title}
            </Text>
          </Link>
        </div>
        {#if subtitle}
          <div class="subtitle">
            <Text accent sc>
              {subtitle}
            </Text>
          </div>
        {/if}
      </div>
      <div class="info">
        {#if tags}
          <div class="tags">
            {#each tags as tag}
              <div class="tag">
                <Link on:click={() => dispatcher("filter", { tag })}>
                  <Text>#{tag}</Text>
                </Link>
              </div>
            {/each}
          </div>
        {/if}
        <div class="date">
          <Text mono>{fmt(date)}</Text>
        </div>
      </div>
    </div>
  </Paper>
</div>

<style>
  .summary {
    width: 50rem;
    min-height: 6rem;
    max-width: calc(100vw - 4rem);
  }

  .content {
    box-sizing: border-box;
    height: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .titles {
    line-height: 1.2;
    padding-top: 2px;
  }

  .title {
    font-size: var(--font-size-heading);
  }

  .subtitle {
    color: var(--color-ink-light);
    text-transform: lowercase;
  }

  .info {
    display: flex;
    flex-direction: column;
    text-align: end;
  }

  .tags {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0 1rem;
    flex-basis: min-content;
    font-size: var(--font-size-note);
  }

  .date {
    font-size: var(--font-size-note);
    text-align: right;
    margin-top: auto;
  }
</style>
