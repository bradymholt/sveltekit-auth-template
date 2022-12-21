<script lang="ts">
	import '../style/app.css';
	import '../style/theme.css';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<header>
	<nav>
		<h1><img src="/logo.svg" height="25px" width="25px" alt="Logo" /> Builder</h1>				
		<div>
			{#if !data.email}
				<a href="/login">Login</a>
				<a href="/register">Register</a>
			{:else}
				<a on:click={invalidateAll} href="/logout">Logout</a>
			{/if}
		</div>
	</nav>
</header>
<hr />
<main>
	<slot />
</main>

<svelte:head>
	<title>My Site</title>
</svelte:head>

<style lang="postcss">
	nav {
		display: flex;
		justify-content: space-between;

		h1 {
			text-transform: uppercase;
		}

		a {
			display: inline-block;
			padding: 0.5rem 1rem;
		}
	}
</style>
