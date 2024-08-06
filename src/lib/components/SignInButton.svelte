<script lang="ts">
	import { auth } from '$lib/logic/auth/auth';
	import Button, { Modifier } from '$lib/components/Button.svelte';
	import { userStore } from '$lib/logic/auth/auth';

	export let modifier: Modifier | undefined = undefined;
	console.log(auth);
</script>

{#if $userStore && $userStore.email}
	<Button on:click={() => auth.signOut()} {modifier}>Sign Out</Button>
{:else}
	<Button on:click={() => auth.signIn()} {modifier}><slot>Sign In</slot></Button>
{/if}
