<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { auth, userStore } from '$lib/logic/auth/auth';
	import { goto } from '$app/navigation';

	let isLoading = true;
	let isSignedIn = false;

	let unsubscribe: () => void;
	onMount(() => {
		unsubscribe = userStore.subscribe(async (user) => {
			isSignedIn = user !== null;
			isLoading = auth.isPerformingAction;
			if (!isLoading && !isSignedIn) {
				await goto('/sign-in');
			}
		});
	});
	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

{#if isLoading}
	<div>Loading...</div>
{:else if isSignedIn}
	<slot />
{/if}

<style>
</style>
