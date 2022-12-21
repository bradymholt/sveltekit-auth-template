import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import jwt from "@tsndr/cloudflare-worker-jwt";
import type { Actions } from "./$types";
import { hashString } from "$lib/crypto";
import { z } from "zod";
import { parseFormData } from "$lib/validation";

export const actions: Actions = {
  default: async ({ request, cookies, platform }) => {
    const form = await parseFormData(
      request,
      z.object({
        email: z.string().email(),
        password: z.string()
      })
    );

    if (!form.valid) {
      return form.failure;
    } else {
      // Authenticate user
      const submittedPasswordHash = await hashString(
        form.data.password.toString(),
        env.PASSWORD_SALT!
      );
      const storedPasswordHash = await platform.env.AUTH.get(`user:${form.data.email}`);
      if (storedPasswordHash != submittedPasswordHash) {
        return form.fail({ global: "Login was unsuccesful" });
      }

      // Set JWT cookie
      const token = await jwt.sign({ email: form.data.email }, env.JWT_SECRET!);
      cookies.set("jwt", token);

      // Redirect to main page
      throw redirect(307, "/");
    }
  }
};
