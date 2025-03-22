<script>
  import Paper from "scattered-papers/Paper.svelte";
  import Header from "../component/Header.svelte";
  import Summary from "../component/Summary.svelte";

  export let articles;

  let filter = null;
  function applyFilter(event) {
    if (event.detail.tag) {
      filter = event.detail.tag;
    } else {
      filter = null;
    }
  }
</script>

<div class="index">
  <Header />

  <div class="tickets">
    {#if filter}
      <button on:click={() => (filter = null)}>
        <Paper>
          <div class="button-content">
            Filtering for #{filter} &times;
          </div>
        </Paper>
      </button>
    {/if}
    {#await articles then articles}
      {#each articles.filter( ({ tags }) => (filter ? tags.includes(filter) : true), ) as article (article.id)}
        <Summary {...article} on:filter={applyFilter} />
      {/each}
    {/await}
  </div>
</div>

<style>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    font: inherit;
    background: none;
    border: none;
    margin-left: auto;
    cursor: pointer;
  }

  .button-content {
    padding: 0.5rem;
  }

  .tickets {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
