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
    position: relative;
    margin: 5rem auto;
    width: 60rem;
    font-size: 1.15rem;
    --font-sub-display: 'Vollkorn SC', sans-serif;
    --font-size-title: 1.75em;
    --font-size-subtitle: 1.1em;
    --font-size-heading: 1.25em;
    --font-size-subheading: 1em;
    --font-size-body: 1em;
    --font-size-note: 0.9em;
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

  .content :global(i, emph, cite) {
    font-style: italic;
  }

  .content :global(code) {
    font-size: 0.85em;
    font-family: var(--font-mono);
    font-variant-numeric: unset;
  }

  .content :global(:not(pre) code) {
    padding: 0 0.2rem;
  }

  /** Headings */

  .content :global(h1, h3, h4) {
    font-family: var(--font-display);
  }

  .content :global(h1) {
    font-size: var(--font-size-title);
    margin-left: 2rem;
  }

  .content :global(h2) {
    font-family: var(--font-sub-display);
    font-size: var(--font-size-subtitle);
    text-transform: lowercase;
    margin-left: 2rem;
    letter-spacing: -0.01em;
  }

  .content :global(h3) {
    font-size: var(--font-size-heading);
    margin-top: 4rem;
    font-weight: 500;
  }

  .content :global(h4) {
    font-size: var(--font-size-subheading);
    margin-top: 3rem;
    font-weight: 600;
  }

  .content :global(h5) {
    font-family: var(--font-accent);
    font-size: var(--font-size-body);
    margin-top: 2rem;
    margin-bottom: -0.5rem;
  }

  .content :global(h6) {
    font-family: var(--font-body);
    font-size: var(--font-size-note);
    text-align: right;
    margin-top: -0.6rem;
    margin-right: 2rem;
  }

  /** Rules */

  .content :global(hr) {
    border: none;
    height: 1px;
    width: 10rem;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .content :global(h2 + hr) {
    border: none;
    width: calc(100% + 4rem);
    margin-left: -2rem;
    margin-bottom: 3rem;
    height: 1px;
    background-image: linear-gradient(to right, black, rgba(0, 0, 0, 0.2));
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
    text-transform: lowercase;
    font-size: 0.85em;
    font-weight: 400;
  }

  .content :global(dd) {
    display: block;
    margin-left: 2rem;
  }

  /** Code */

  .content :global(pre) {
    padding: 1em;
    background-color: var(--color__one-dark--black);
    color: var(--color__one-dark--white);
  }

  /** Quotes */

  .content :global(blockquote) {
    margin-top: 1rem;
    margin-left: 1rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-left: 3px groove rgba(0, 0, 0, 0.5);
  }

  .content :global(blockquote p) {
    text-indent: 0;
  }

  .content :global(blockquote p:first-child) {
    margin: 0;
  }

  .content :global(a:link, a:visited, a:active) {
    color: var(--link--color);
    text-decoration: none;
  }

  .content :global(a:hover, a:focus) {
    color: var(--link--color-hover);
    text-decoration: underline;
  }
</style>
