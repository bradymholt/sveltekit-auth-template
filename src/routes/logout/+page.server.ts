import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ platform, cookies }) => {
  cookies.delete("jwt", { path: "/" });
  throw redirect(307, "/");
}) satisfies PageServerLoad;
