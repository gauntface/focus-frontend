<script lang="ts">
	import MarketingNav from '$lib/components/MarketingNav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="l-legal">
	<MarketingNav />

	<main class="l-legal__main">
		<slot />
	</main>
	<Footer />
</div>

<style>
	.l-legal {
		display: flex;
		flex-direction: column;
	}

	.l-legal__main {
		max-width: var(--width);
		margin: 0 auto;
		flex: 1;
	}

	.l-legal__main :global(a) {
		text-decoration: underline;
		font-weight: 600;
	}
</style>
