<script>
  import marked from 'marked';
  export let content;

  $: mdContent = marked(content, {
    gfm: true,
    smartypants: true,
    smartLists: true,
    highlight: null, // TODO
  });
</script>

<div>
  {@html mdContent}
</div>
