import { env } from '$env/dynamic/private';
import jwt from '@tsndr/cloudflare-worker-jwt';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';
import { initialize as initDevPlatform } from '$lib/devPlatform';

let devPlatform: App.Platform | null = null;

(async function onStartup() {
	if (dev) {
		devPlatform = await initDevPlatform();
	}
})();

export const parseJwt = (async ({ event, resolve }) => {
	const jwtFromCookie = event.cookies.get('jwt');
	if (jwtFromCookie) {
		const JWT_SECRET = env.JWT_SECRET!;
		const isJwtValid = await jwt.verify(jwtFromCookie, JWT_SECRET);
		if (isJwtValid) {
			const jwtDecoded = await jwt.decode(jwtFromCookie);
			event.locals.email = jwtDecoded.payload.email;
		}
	}

	return resolve(event);
}) satisfies Handle;

export const configurePlatform = (async ({ event, resolve }) => {
	if (dev && devPlatform) {
		event.platform = devPlatform;
	}
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(parseJwt, configurePlatform);
