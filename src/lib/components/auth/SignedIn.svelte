<script lang="ts">
	import { onDestroy } from 'svelte';
	import { auth, userStore } from '$lib/logic/auth/auth';
	import { goto } from '$app/navigation';

	let isLoading = true;
	let isSignedIn = false;

	const unsubscribe = userStore.subscribe(async (user) => {
		isSignedIn = user !== null;
		isLoading = auth.isPerformingAction;
		if (!isLoading && !isSignedIn) {
			await goto('/sign-in');
		}
	});
	onDestroy(unsubscribe);
</script>

{#if isLoading}
	<div>Loading...</div>
{:else if isSignedIn}
	<slot />
{/if}

<style>
</style>
