<script>
  import Paper from '../../vendor/cameldridge/src/component/Paper.svelte';
</script>

<div class='article'>
  <Paper>
    <div class='content'>
      <slot />
    </div>
  </Paper>
</div>

<style>
  .article {
    margin: 5rem auto;
    width: 60rem;
  }

  .content {
    box-sizing: border-box;
    padding: 10rem 10rem;
  }
</style>
