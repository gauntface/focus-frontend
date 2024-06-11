<script lang="ts">
	import { auth } from '$lib/logic/auth/auth';
	import Button, { Modifier } from '$lib/components/Button.svelte';

	export let modifier: Modifier | undefined = undefined;
</script>

{#if auth.user && auth.user.email}
	<Button on:click={() => auth.signOut()} {modifier}>Sign Out</Button>
{:else}
	<Button on:click={() => auth.signIn()} {modifier}><slot>Sign In</slot></Button>
{/if}
