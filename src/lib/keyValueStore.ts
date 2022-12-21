export interface IKeyValueStore {
	get(key: string): Promise<string | null>;
	getWithMetadata(key: string): Promise<string | null>;
	put(key: string, value: string): Promise<void>;
	list(): Promise<string[]>;
	delete(key: string): Promise<void>;
}

class InMemoryKeyValueStore implements IKeyValueStore {
	private _devKvStore: Record<string, string> = {};

	get(key: string): Promise<string | null> {
		return Promise.resolve(this._devKvStore[key]);
	}

	getWithMetadata(key: string) {
		return Promise.resolve(this._devKvStore[key]);
	}

	put(key: string, value: string) {
		console.log(`[put] ${key}:${value}`);
		this._devKvStore[key] = value;
		return Promise.resolve();
	}

	list() {
		return Promise.resolve(Object.keys(this._devKvStore));
	}

	delete(key: string) {
		console.log(`[delete] ${key}`);
		delete this._devKvStore[key];
		return Promise.resolve();
	}
}

export let inMemoryKeyValueStore = new InMemoryKeyValueStore();
