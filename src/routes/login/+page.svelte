<script lang="ts">
  import { dev } from "$app/environment";
  import { devEmail, devPassword } from "$lib/constants";
  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<form class="prominent-box" method="POST">
  <h2>Login</h2>
  <span class="invalid">{form?.errors?.global ?? ""}</span>
  <label for="email">Email</label>
  <input
    type="text"
    class:invalid={form?.errors?.email}
    placeholder="Email"
    name="email"
    value={form?.data?.email ?? (dev && !form) ? devEmail : ""}
  />
  <span class="invalid">{form?.errors?.email ?? ""}</span>
  <label for="email">Password</label>
  <input
    type="password"
    class:invalid={form?.errors?.password}
    placeholder="Password"
    name="password"
    value={dev && !form ? devPassword : ""}
  />
  <span class="invalid">{form?.errors?.password ?? ""}</span>
  <button class="btn" type="submit">Login</button>
  <a href="/reset-password-request">Reset password</a>
</form>

<style>
</style>
