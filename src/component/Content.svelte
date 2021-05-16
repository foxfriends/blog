<div class='content'>
  <slot />
</div>

<style>
  .content {
    box-sizing: border-box;
    padding: 10rem 0;
    font-family: var(--font-body);
  }

  /** paragraphs */

  .content :global(p + p) {
    text-indent: 1em;
  }

  .content :global(p, h3, h4, h5, h6, dl, :not(li) > ul, :not(li) > ol, blockquote, pre, figure) {
    margin-top: 1rem;
  }

  .content :global(p, h3, h4, h5, h6, dl, :not(li) > ul, :not(li) > ol, blockquote, figure) {
    margin: 1rem 10rem 0;
  }

  /** inlines */

  .content :global(b, strong) {
    font-weight: 600;
  }

  .content :global(i, emph, cite) {
    font-style: italic;
  }

  .content :global(code),
  .content :global(pre) {
    font-family: var(--font-mono);
    font-variant-numeric: unset;
  }

  .content :global(pre),
  .content :global(:not(pre) code) {
    font-size: 0.85em;
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
    margin-right: 2rem;
    letter-spacing: -0.01em;
    text-align: right;
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
    font-size: var(--font-size-subheading);
    margin-top: 2rem;
    margin-bottom: -0.5rem;
  }

  .content :global(h6) {
    font-family: var(--font-accent);
    font-size: var(--font-size-body);
    margin-top: 2rem;
    margin-bottom: -0.5rem;
  }

  /** Figures */

  .content :global(figure) {
    display: flex;
    flex-direction: column;
    margin: 2em 0;
  }

  .content :global(figcaption) {
    display: block;
    align-self: flex-end;
    font-family: var(--font-body);
    font-size: var(--font-size-note);
    text-align: right;
    margin-top: -0.6rem;
    padding: 0 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  /** Rules */

  .content :global(hr) {
    border: none;
    height: 1px;
    width: 10rem;
    background-color: rgba(0, 0, 0, 0.25);
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

  .content :global(li + li) {
    margin-top: 0.5rem;
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
    position: relative;
    padding: 1em;
    width: 80ch;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--color__one-dark--black);
    color: var(--color__one-dark--white);
  }

  .content :global(pre code::after) {
    position: absolute;
    content: attr(data-language);
    right: 2em;
    bottom: 0em;
  }

  /** Quotes */

  .content :global(blockquote) {
    margin-left: 11rem;
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
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

  /** Tables */

  .content :global(table) {
    margin: 2rem 0;
    line-height: 1.3;
  }

  .content :global(table, thead, tbody, tr, td, th) {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .content :global(th) {
    font-weight: 600;
  }

  .content :global(td, th) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    padding: 0.6rem 1rem;
    font-variant-numeric: lining-nums tabular-nums;
  }
</style>
