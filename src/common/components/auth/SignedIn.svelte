<script lang="ts">
  import { onDestroy } from "svelte";
  import {auth, userStore} from "../../auth/auth";

  let isLoading = true;
  let isSignedIn = false;

  const unsubscribe = userStore.subscribe((user) => {
    isSignedIn = user !== null;
    isLoading = auth.isPerformingAction;
    if (!isLoading && !isSignedIn) {
      window.location.pathname = "/sign-in";
    }
  });
  onDestroy(unsubscribe);
</script>

{#if isLoading}
  <div>Loading...</div>
{:else}
  {#if isSignedIn}
    <slot />
  {/if}
{/if}

<style>

</style>
