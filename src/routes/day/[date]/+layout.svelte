<script lang="ts">
	import SignedIn from '$lib/components/auth/SignedIn.svelte';

	// Read more: https://stackoverflow.com/questions/73567518/how-to-check-authentication-in-sveltekit
</script>

<SignedIn>
	<slot />
</SignedIn>
