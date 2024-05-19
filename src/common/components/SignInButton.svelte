<script lang="ts">
  import { auth, userStore } from "../auth/auth";
  import Button, { Modifier } from "./Button.svelte";

  export let modifier: Modifier | undefined = undefined;
</script>

{#if $userStore && $userStore.email}
  <Button on:click={() => auth.signOut()} {modifier}>Sign Out</Button>
{:else}
  <Button on:click={() => auth.signIn()} {modifier}><slot>Sign In</slot></Button>
{/if}
