<script>
  import Paper from '../../vendor/cameldridge/src/component/Paper.svelte';
  import Text from '../../vendor/cameldridge/src/component/Text.svelte';
  import Image from '../../vendor/cameldridge/src/component/Image.svelte';
  import Link from '../../vendor/cameldridge/src/component/Link.svelte';
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
          <Link href='https://cameldridge.com' discrete>
            <span class='logo'><Image name='home' alt='Homepage' /></span>
          </Link>
        </div>
        <div class='link'>
          <Link href='https://github.com/foxfriends' external discrete>
            <span class='logo'><Image name='github' alt='GitHub' /></span>
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
