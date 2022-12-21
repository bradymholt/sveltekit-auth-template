// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IKeyValueStore } from "$lib/kevValueStore";

// and what to do when importing types
declare global {
  declare namespace App {
    interface Locals {
      email?: string;
    }

    interface Platform {
      env: {
        AUTH: IKeyValueStore;
      };
    }

    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
}
