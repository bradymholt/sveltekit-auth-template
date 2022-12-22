<script lang="ts">
  import "../style/app.css";
  import { invalidateAll } from "$app/navigation";
  import House from "$lib/svg/House.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<header>
  <nav>
    <div class="title"><a href="/"><House height="30" /> Builder</a></div>
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
  header,
  main {
    max-width: var(--max-width-large);
    margin: 1rem;
    margin-left: auto;
    margin-right: auto;
  }

  /* Smaller screens */
  @media screen and (max-width: 1050px) {
    header,
    main {
      max-width: 80vw;
    }
  }

  nav {
    font-size: 1.25rem;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      text-transform: uppercase;
      font-size: 1.4em;
    }

    a {
      padding: 0.5rem 1rem;
    }
  }

  hr {
    opacity: 0.25;
  }
</style>
