<script>
  import ImageProvider from 'scattered-papers/ImageProvider.svelte';
  import Header from '../component/Header.svelte';
  import Summary from '../component/Summary.svelte';
  const images = Object
    .fromEntries(Object
      .entries(import.meta.globEager('../../vendor/cameldridge/src/image/**/*.{png,svg}'))
      .map(([path, value]) => [path.slice('../../vendor/cameldridge/src/image/'.length), value]));

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

<ImageProvider {images}>
  <div class='index'>
    <Header />

    {#await articles then articles}
      {#each articles.filter(filter) as article (article.id)}
        <Summary {...article} on:filter={applyFilter} />
      {/each}
    {/await}
  </div>
</ImageProvider>

<style>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
