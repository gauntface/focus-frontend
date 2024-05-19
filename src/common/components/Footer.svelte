<script lang="ts">
  import { Modifier } from './Button.svelte';
  import SignInButton from './SignInButton.svelte';
  let promptForInstall = false;
  function onInstallClick() {
    // TODO: on install click
  }
</script>
<footer class="c-footer">
  <p><a href="/"><img width="180" height="100" src="/logo/full-logo-white.svg" alt="Focus logo in white" /></a></p>
  <div class="c-footer__content">
    <div>
      <h5>Useful Links</h5>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/#about">About Focus</a></li>
        {#if promptForInstall}
          <li><div role="button" tabindex="0" on:keypress={(e) => e.key === 'Enter' && onInstallClick()} on:click={() => onInstallClick()}>Install App</div></li>
        {/if}
        <li><a href="https://www.buymeacoffee.com/gauntface" target="_blank">Support this Project</a></li>
        <li><a href="https://app.beampipe.io/domain/focus.gaunt.dev" target="_blank">Analytics</a></li>
        <li><SignInButton modifier={Modifier.Highlight} /></li>
      </ul>
    </div>

    <div>
      <h5>Policy</h5>
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/cookies">Cookies</a></li>
      </ul>
    </div>

    <div>
      <h5>Get in Touch</h5>
      <ul>
        <li><a href="https://github.com/gauntface/focus-frontend/issues/new" target="_blank">Found a bug?</a></li>
        <li><a href="mailto:focus@gaunt.dev">E-mail</a></li>
        <li><a href="https://mastodon.gaunt.dev/@matt" target="_blank">Mastodon</a></li>
      </ul>
    </div>
  </div>

  <p>© All rights reserved {new Date().getFullYear()}</p>
</footer>

<style>
  .c-footer {
	width: 100%;
	background-color: var(--navy);
	color: white;
	margin: var(--xl-padding) auto 0 auto;
  container-name: footer;
	container-type: inline-size;
}

.c-footer__content {
	max-width: var(--width);
	margin: var(--l-padding) auto;
	padding-bottom: var(--l-padding);
	border-bottom-style: solid;
	border-width: 1px;
	border-color: rgb(255 255 255 / 20%);
}

.c-footer__content > div {
	margin-bottom: var(--xl-padding);
}

.c-footer__content > div:last-child {
	margin-bottom: 0;
}

.c-footer h5 {
	font-size: 1rem;
	margin-top: 0;
	margin-bottom: 1.2lh;
}

.c-footer ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.c-footer li {
	margin: var(--s-padding) 0;
}

.c-footer > p {
	margin: var(--l-padding) auto;
	text-align: center;
}

@container footer (min-width: 520px) {
	.c-footer__content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.c-footer__content > div {
		margin-bottom: 0;
	}
}

</style>
