import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import jwt from '@tsndr/cloudflare-worker-jwt';
import type { Actions } from './$types';
import { hashString } from '$lib/crypto';
import { parseFormData } from '$lib/validation';
import { z } from 'zod';
import { sendEmail } from '$lib/email';
import { registrationEmailTo } from '$lib/constants';

export const actions: Actions = {
	default: async ({ request, cookies, platform }) => {
		const form = await parseFormData(
			request,
			z.object({
				email: z.string().email(),
				password: z.string().min(6, 'Password must be at least 6 characters long')
			})
		);

		if (!form.valid) {
			return form.failure;
		} else {
			const existingUser = await platform.env.AUTH.get(`user:${form.data.email}`);
			if (existingUser) {
				return form.fail({ email: 'Email already registered' });
			}

			const passwordHash = await hashString(form.data.password.toString(), env.PASSWORD_SALT!);
			await platform.env.AUTH.put(`user:${form.data.email}`, passwordHash);

			// Send registration email
			await sendEmail(
				registrationEmailTo,
				'New user registration',
				`New user registered: ${form.data.email}`
			);

			// Set JWT cookie
			const token = await jwt.sign({ email: form.data.email }, env.JWT_SECRET!);
			cookies.set('jwt', token);

			// Redirect to main page
			throw redirect(307, '/');
		}
	}
};
