<script lang="ts">
  import { auth, userStore } from "../../common/auth/auth";

  if ($userStore && $userStore.email) {
    window.location.pathname = "/home";
  }
</script>

<main>
  <button on:click={() => auth.signIn()}>Sign In</button>
</main>
