import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import jwt from '@tsndr/cloudflare-worker-jwt';
import type { Actions } from './$types';
import { z } from 'zod';
import { parseFormData } from '$lib/validation';
import { sendEmail } from '$lib/email';

export const actions: Actions = {
	default: async ({ request, platform, url }) => {
		const form = await parseFormData(
			request,
			z.object({
				email: z.string().email()
			})
		);

		url.protocol;

		if (!form.valid) {
			return form.failure;
		} else {
			const emailExists = !!(await platform.env.AUTH.get(`user:${form.data.email}`));
			if (emailExists) {
				// Create reset token
				const token = crypto.randomUUID();
				await platform.env.AUTH.put(`reset:${token}`, form.data.email);

				sendEmail(
					form.data.email,
					'Reset Password',
					`Please click the link below to reset your password: ${url.protocol}//${url.host}/reset-password?token=${token}`
				);
			}

			return { success: true };
		}
	}
};
