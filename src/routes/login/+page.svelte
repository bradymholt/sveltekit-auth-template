<script lang="ts">
  import { dev } from '$app/environment';
  import { devEmail, devPassword } from '$lib/constants';
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<div class="container">
  <h2>Login</h2>
  <form method="POST">
    <span class="invalid">{form?.errors?.global ?? ''}</span>
    <label for="email">Email</label>
    <input
      type="text"
      class:invalid={form?.errors?.email}
      placeholder="Email"
      name="email"
      value={form?.data?.email ?? (dev && !form) ? devEmail : ''}
    />
    <span class="invalid">{form?.errors?.email ?? ''}</span>
    <label for="email">Password</label>
    <input
      type="password"
      class:invalid={form?.errors?.password}
      placeholder="Password"
      name="password"
      value={dev && !form ? devPassword : ''}
    />
    <span class="invalid">{form?.errors?.password ?? ''}</span>
    <button type="submit">Login</button>
  </form>
  <a href="/reset-password-request">Reset password</a>
</div>

<style lang="postcss">
  .container {
    max-width: 450px;
  }
</style>
