<script lang="ts">
  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<form class="prominent-box" method="POST">
  {#if form?.success}
    <p>If there is an email registered with the specified address a reset email was sent.</p>
  {:else}
    <h2>Reset Password</h2>

    <label for="email">Email</label>
    <input type="text" class:invalid={form?.errors?.email} placeholder="Email" name="email" />
    <span class="invalid">{form?.errors?.email ?? ""}</span>
    <button type="submit">Send Reset Email</button>
  {/if}
</form>

<style>
</style>
