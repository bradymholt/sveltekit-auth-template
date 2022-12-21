import { env } from '$env/dynamic/private';
import { devEmail, devPassword } from './constants';
import { hashString } from './crypto';
import { inMemoryKeyValueStore } from './keyValueStore';

export async function initialize(): Promise<App.Platform> {
	const seedUserHashedPassword = await hashString(devPassword, env.PASSWORD_SALT!);
	inMemoryKeyValueStore.put(`user:${devEmail}`, seedUserHashedPassword);

	return {
		env: {
			AUTH: inMemoryKeyValueStore
		}
	};
}
