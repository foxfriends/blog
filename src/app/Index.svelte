<script>
  import Header from '../component/Header.svelte';
  import Summary from '../component/Summary.svelte';
  export let articles;

  let filter = () => true;
  function applyFilter(event) {
    if (event.detail.tag) {
      filter = ({ tags }) => tags.includes(tag);
    } else {
      filter = () => true;
    }
  }
</script>

<div class='index'>
  <Header />

  {#await articles then articles}
    {#each articles.filter(filter) as article (article.id)}
      <Summary {...article} on:filter={applyFilter} />
    {/each}
  {/await}
</div>

<style>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
