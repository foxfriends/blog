<script>
  import Paper from 'scattered-papers/Paper.svelte';
  import Text from 'scattered-papers/Text.svelte';
  import Link from 'scattered-papers/Link.svelte';
</script>

<div class='missing'>
  <Paper>
    <div class='content'>
      <div class='title'>
        <Text heading>404&mdash;Not found</Text>
      </div>
      <Link href='/'>
        <span class='link-text'><Text sc>Return to homepage</Text></span>
      </Link>
    </div>
  </Paper>
</div>

<style>
  .missing {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    width: 40rem;
    height: 7rem;
  }

  .content {
    box-sizing: border-box;
    display: flex;

    padding: 0 2rem;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .title {
    font-size: var(--font-size-title);
  }

  .link-text {
    font-size: var(--font-size-body);
  }
</style>
