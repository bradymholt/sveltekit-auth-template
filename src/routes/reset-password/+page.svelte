<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  export let form: ActionData;
  export let data: PageData;
</script>

<div class="container">
  {#if !data.tokenValid}
    <p>Invalid link!</p>
  {:else}
    <h2>Reset Password</h2>
    <form method="POST">
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
    </form>
  {/if}
</div>

<style lang="postcss">
  .container {
    max-width: 450px;
  }
</style>
