<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="l-full-h">
	<slot />
	<Footer />
</div>

<style>
	.l-full-h {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.l-full-h :global(main) {
		flex: 1;
	}
</style>
