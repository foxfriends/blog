<script>
  import Markdown from '../component/Markdown.svelte';
  import Paper from '../../vendor/cameldridge/src/component/Paper.svelte';
  export let article;
</script>

{#await article then article}
  <div class='article'>
    <Paper>
      <div class='content'>
        <Markdown content={article} />
      </div>
    </Paper>
  </div>
{/await}

<style>
  .article {
    margin: 5rem auto;
    width: 60rem;
  }

  .content {
    box-sizing: border-box;
    padding: 6rem 6rem;
  }
</style>
