import { env } from "$env/dynamic/private";
import { error, redirect } from "@sveltejs/kit";
import jwt from "@tsndr/cloudflare-worker-jwt";
import type { Actions, PageServerLoad } from "./$types";
import { hashString } from "$lib/crypto";
import { z } from "zod";
import { parseFormData } from "$lib/validation";

export const load = (async ({ url, platform }) => {
  const token = url.searchParams.get("token");
  const resetTokenEmail = await platform.env.AUTH.get(`reset:${token}`);
  return { token, tokenValid: !!resetTokenEmail };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, platform, url }) => {
    const form = await parseFormData(
      request,
      z.object({
        password: z.string().min(6, "Password must be at least 6 characters long"),
        token: z.string()
      })
    );

    if (!form.valid) {
      return form.failure;
    } else {
      const resetTokenStoreKey = `reset:${form.data.token}`;
      const resetTokenEmail = await platform.env.AUTH.get(resetTokenStoreKey);
      if (!resetTokenEmail) {
        throw error(400, "Invalid token");
      } else {
        await platform.env.AUTH.delete(resetTokenStoreKey);
      }

      const passwordHash = await hashString(form.data.password.toString(), env.PASSWORD_SALT!);
      await platform.env.AUTH.put(`user:${resetTokenEmail}`, passwordHash);

      // Redirect to login page
      throw redirect(307, "/login");
    }
  }
};
