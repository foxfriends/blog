<script context="module">
  import { writable } from 'svelte/store';
  const pl = writable();
  
  const script = document.createElement('script');
  script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/tau-prolog@0.2.81/modules/core.min.js');
  document.body.appendChild(script);
  script.addEventListener('load', () => { pl.set(window.pl); });
</script>

<script>
  export let src;
  export let resolutionLimit = 1000;

  $: console.log(src);

  let session;
  let query = '';
  let question;
  let answers;

  function reset(pl) {
    if (!pl) { return; }
    session = pl.create(resolutionLimit);
    const parsed = session.consult(src);
    if (!parsed) {
      console.error(parsed);
      session = undefined;
    }
  }

  $: reset($pl);

  async function getAnswers() {
    const results = []
    for (;;) {
      const answer = await new Promise(session.answer.bind(session));
      if (!answer) {
        return results;
      }
      results.push(answer);
    }
  }

  function submit({ key }) {
    if (!session) { return; }
    if (key === 'Enter') {
      if (!query.endsWith('.')) {
        query += '.';
      }
      const parsed = session.query(query);
      if (!parsed) {
        console.error(parsed);
        return;
      }
      answers = undefined;
      question = query;
      query = '';
      answers = getAnswers();
    }
  }
</script>

<slot />

<div class='play'>
  <div class='prompt'>
    ?-
    <input
      type='text'
      placeholder={session ? 'Query' : 'Loading...'}
      disabled={!session}
      on:keydown={submit}
      bind:value={query} />
  </div>
  {#if question}
    <span class='input'>?- {question}</span>
  {/if}
  {#if answers}
    {#await answers then answers}
      {#each answers as answer}
        <output>
          {$pl.format_answer(answer)}
        </output>
      {:else}
        <output>false ;</output>
      {/each}
    {/await}
  {/if}
</div>

<style>
  .play {
    font-size: 0.85em;
    font-family: var(--font-mono);
    color: var(--color__code--text);
  }

  .play {
    background-color: var(--color__code--background);
    width: 80ch;
    margin: 0 auto;
    padding: 1em;
  }

  .prompt {
    display: flex;
    align-items: center;
  }

  .prompt input {
    font: inherit;
    color: inherit;
    flex-grow: 1;
    margin-left: 1ch;
    background: none;
    border: none;
    outline: none;
  }

  .input,
  output {
    display: block;
  }

  .input {
    margin-top: 1em;
  }
</style>
