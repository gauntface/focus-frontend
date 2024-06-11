<script lang="ts">
	import { Modifier } from '$lib/components/Button.svelte';
	import SignInButton from '$lib/components/SignInButton.svelte';
</script>

<section class="c-mkt-try">
	<h2>Ready to start using Focus?</h2>

	<p>Sign in below and you&apos;ll be good to go!</p>
	<p><SignInButton modifier={Modifier.Highlight}>Get Started</SignInButton></p>
</section>

<style>
	.c-mkt-try {
		max-width: 600px;
		margin: var(--xl-padding) auto;
		text-align: center;
	}
</style>
