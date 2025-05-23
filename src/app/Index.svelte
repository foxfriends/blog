<script>
  import Paper from "scattered-papers/Paper.svelte";
  import Text from "scattered-papers/Text.svelte";
  import Header from "../component/Header.svelte";
  import Summary from "../component/Summary.svelte";

  let embed = null;
  let cosineSimilarity = null;
  async function getEmbed() {
    if (embed) return embed;
    const { pipeline, cos_sim } = await import("@huggingface/transformers");
    cosineSimilarity = cos_sim;
    embed = await pipeline("feature-extraction", "intfloat/e5-small-v2", {
      dtype: "fp32",
      subfolder: "",
    });
    return embed;
  }

  const { articles } = $props();

  let filter = $state(null);
  let search = $state("");
  let appliedSearch = $state("");
  let searchLoading = $state(false);
  let embedded = $state(null);

  function applyFilter(tag) {
    if (tag) {
      filter = tag;
    } else {
      filter = null;
    }
  }

  const filteredArticles = $derived(
    articles
      .filter(({ tags }) => (filter ? tags.includes(filter) : true))
      .map((article) =>
        embedded
          ? {
              ...article,
              relevance: cosineSimilarity(
                article.embedding,
                embedded.tolist()[0],
              ),
            }
          : { ...article, relevance: 1 },
      )
      .sort((a, b) => b.relevance - a.relevance),
  );

  async function applySearch(value) {
    appliedSearch = value;
    if (!appliedSearch) {
      embedded = null;
    } else {
      searchLoading = true;
      const embed = await getEmbed();
      embedded = await embed(`query: ${appliedSearch}`, {
        pooling: "mean",
        normalize: true,
      });
      searchLoading = false;
    }
  }
</script>

<div class="index">
  <Header />

  <div class="tickets">
    <div class="tools">
      <div class="focus-within">
        <Paper>
          <div class="search-area">
            <label for="search"><Text accent sc>Search:</Text></label>
            <input
              id="search"
              type="search"
              placeholder=""
              bind:value={search}
              onkeydown={(event) =>
                event.key === "Enter" && applySearch(search)}
            />
            <button onclick={() => applySearch(search)}>&RightArrow;</button>
          </div>
        </Paper>
      </div>
      {#if appliedSearch}
        <button onclick={() => applySearch("")}>
          <Paper>
            <div class="button-content">
              <Text>
                Searching for "{appliedSearch}" &times;
              </Text>
            </div>
          </Paper>
        </button>
      {/if}
      {#if filter}
        <button onclick={() => (filter = null)}>
          <Paper>
            <div class="button-content">
              <Text>
                Filtering for #{filter} &times;
              </Text>
            </div>
          </Paper>
        </button>
      {/if}
    </div>
    {#if searchLoading}
      <div class="loading">
        <Paper>
          <div class="loading-content">
            <Text>Searching...</Text>
          </div>
        </Paper>
      </div>
    {:else}
      {#each filteredArticles as article (article.id)}
        <Summary {...article} onfilter={applyFilter} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .index {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
  }

  button,
  input {
    font: inherit;
    background: none;
    border: none;
    margin-left: auto;
    flex-shrink: 0;
  }

  button {
    cursor: pointer;
  }

  input {
    flex-grow: 1;
    outline: none;
  }

  label {
    color: var(--color-ink-light);
    text-transform: lowercase;
  }

  .button-content,
  .search-area {
    padding: 0.5rem;
  }

  .tickets {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tools,
  .search-area {
    display: flex;
    flex-direction: row;
  }

  .tools {
    max-width: 50rem;
    width: 100%;
    gap: 1rem;
  }

  .search-area {
    align-items: baseline;
    gap: 0.5rem;
  }

  .focus-within {
    flex-grow: 1;
  }

  .focus-within:focus-within,
  button:hover {
    --paper--shadow: 0.125rem 0.125rem 0.5rem rgb(0 0 0 / 0.75);
    & > :global(*) {
      transition: box-shadow 100ms;
    }
  }

  .loading {
    width: 30ch;
    margin: 0 auto;
  }

  .loading-content {
    padding: 1rem;
  }
</style>
