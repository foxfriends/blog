<script>
  import Paper from 'scattered-papers/Paper.svelte';
  import Text from 'scattered-papers/Text.svelte';
  import Image from 'scattered-papers/Image.svelte';
  import Link from 'scattered-papers/Link.svelte';
  import { BLOG_TITLE, BLOG_SUBTITLE } from '../constants';
</script>

<div class='header'>
  <Paper>
    <div class='content'>
      <div class='title'>
        <Text heading>
          {BLOG_TITLE}
        </Text>
      </div>
      <div class='subtitle'>
        <Text sc>
          {BLOG_SUBTITLE}
        </Text>
      </div>
      <div class='links'>
        <div class='link'>
          <Link href='https://cameldridge.com' discreet>
            <span class='logo'><Image name='home' alt='Homepage' /></span>
          </Link>
        </div>
        <div class='link'>
          <Link href='https://github.com/foxfriends' external discreet>
            <span class='logo'><Image name='github' alt='GitHub' /></span>
          </Link>
        </div>
        <div class='link'>
          <Link href='/rss.xml' external discreet>
            <span class='logo'><Image name='rss' alt='RSS Feed' /></span>
          </Link>
        </div>
      </div>
    </div>
  </Paper>
</div>

<style>
  .header {
    width: 60rem;
    margin: 4rem;
    max-width: calc(100vw - 2rem);
  }

  .content {
    box-sizing: border-box;
    padding: 3rem 0 1.5rem 0;
  }

  .title {
    font-size: var(--font-size-title);
    text-align: center;
  }

  .subtitle {
    font-size: var(--font-size-body);
    text-align: center;
  }

  .links {
    text-align: center;
    height: 2rem;
    margin-top: 1.5rem;
  }

  .link {
    display: inline-block;
    margin: 0 0.25rem;
  }

  .logo {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
