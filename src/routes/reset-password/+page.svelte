<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  export let form: ActionData;
  export let data: PageData;
</script>

<form class="prominent-box" method="POST">
  {#if !data.tokenValid}
    <p>Invalid link!</p>
  {:else}
    <h2>Reset Password</h2>
    <label for="password">New Password</label>
    <input
      type="password"
      class:invalid={form?.errors?.password}
      placeholder="Password"
      name="password"
    />
    <span class="invalid">{form?.errors?.password ?? ""}</span>
    <input type="hidden" name="token" value={data.token} />
    <button type="submit">Reset Password</button>
  {/if}
</form>

<style>
</style>
