<script lang="ts">
	import '$lib/styles/reset.css';
	import SignedIn from '$lib/components/auth/SignedIn.svelte';
</script>

<SignedIn>
	<slot />
</SignedIn>
