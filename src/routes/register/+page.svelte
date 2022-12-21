<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="container">
	<h2>Register new account</h2>
	<form method="POST">
		<label for="email">Email</label>
		<input
			type="text"
			placeholder="Email"
			class:invalid={form?.errors?.email}
			name="email"
			value={form?.data?.email ?? ''}
		/>
		<span class="invalid">{form?.errors?.email ?? ''}</span>
		<label for="email">Password</label>
		<input
			type="password"
			class:invalid={form?.errors?.password}
			placeholder="Password"
			name="password"
		/>
		<span class="invalid">{form?.errors?.password ?? ''}</span>
		<button type="submit">Register</button>
	</form>
</div>

<style lang="postcss">
	.container {
		max-width: 450px;
	}
</style>
