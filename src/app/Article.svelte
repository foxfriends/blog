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
  /** page */
  .article {
    margin: 5rem auto;
    width: 60rem;
    font-size: 1.15rem;

    --font-size-title: 1.5em;
    --font-size-subtitle: 1.3em;
    --font-size-heading: 1.2em;
    --font-size-subheading: 1.1em;
    --font-size-body: 1em;
    --font-size-note: 5/6em;
  }

  .content {
    box-sizing: border-box;
    padding: 10rem 10rem;
    font-family: var(--font-body);
  }

  /** paragraphs */

  .content :global(p + p) {
    text-indent: 1em;
  }

  .content :global(p, dl, :not(li) > ul, :not(li) > ol, pre) {
    margin-top: 1rem;
  }

  /** inlines */

  .content :global(b, strong) {
    font-weight: 600;
  }

  .content :global(i, emph) {
    font-style: italic;
  }

  .content :global(code) {
    font-size: 0.85em;
    font-family: var(--font-mono);
    font-variant-numeric: unset;
  }

  .content :global(:not(pre) code::before, :not(pre) code::after) {
    content: ' ';
  }

  /** Headings */

  .content :global(h1, h2, h3, h4) {
    font-family: var(--font-display);
  }

  .content :global(h1) {
    font-size: var(--font-size-title);
    text-align: center;
  }

  .content :global(h2) {
    font-size: var(--font-size-subtitle);
    text-align: center;
  }

  .content :global(h3) {
    font-size: var(--font-size-header);
    text-align: left;
  }

  .content :global(h4) {
    font-size: var(--font-size-subheader);
    text-align: left;
  }

  .content :global(h5) {
    font-family: var(--font-accent);
    font-size: var(--font-size-body);
    text-align: left;
    font-variant-caps: all-small-caps;
  }

  .content :global(h6) {
    font-family: var(--font-body);
    font-size: var(--font-size-note);
    text-align: right;
  }

  /** Lists */

  .content :global(ul, ol) {
    margin-left: 0;
    padding-left: 2em;
  }

  .content :global(li) {
    margin-left: 0;
    padding-left: 0;
  }

  .content :global(ul > li) {
    list-style-type: disc;
  }

  .content :global(li::before) {
    /* base.css styles lists a bit different, so we have to revert that */
    content: '';
  }

  .content :global(ol > li) {
    list-style: latin;
  }

  /** Def lists */

  .content :global(dl) {
    margin-left: 0;
    padding-left: 0;
  }

  .content :global(dt) {
    font-weight: 500;
  }

  .content :global(dt::before) {
    content: 'Def. ';
    font-family: var(--font-accent);
    text-transform: none;
    font-size: 0.85em;
    font-weight: 400;
    font-variant-caps: all-small-caps;
  }

  .content :global(dd) {
    display: block;
    margin-left: 2pc;
  }
</style>
