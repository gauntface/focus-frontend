<script lang="ts">
	import SignInButton from '$lib/components/SignInButton.svelte';
	import Button, { Modifier } from '$lib/components/Button.svelte';
	import { userStore } from '$lib/logic/auth/auth';
</script>

<section class="c-mkt-nav">
	<a href="/"><img width="48" height="48" src="/logo/mini-logo.svg" alt="Small Focus Logo" /></a>

	<div class="c-mkt-nav__menu">
		<SignInButton modifier={$userStore === null ? undefined : Modifier.Subtle} />
		{#if $userStore && $userStore.email}
			<a href="/home"><Button>Tasks</Button></a>
		{/if}
	</div>
</section>

<style>
	.c-mkt-nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: var(--width);
		margin: var(--m-padding) auto;
	}

	.c-mkt-nav__menu {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--m-padding);
	}
</style>
