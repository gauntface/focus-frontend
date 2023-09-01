const precachePrefix = 'focus-precache';
export const precacheCacheName = `${precachePrefix}${process?.env?.FOCUS_PRECACHE_SUFFIX || ''}`;

export function getPrecacheFiles(): string[] {
	if (process?.env?.FOCUS_PRECACHE_FILES) {
		return process.env.FOCUS_PRECACHE_FILES;
	}
	return [];
}
export async function precacheFiles() {
	const cache = await caches.open(precacheCacheName);
	cache.addAll(getPrecacheFiles());
}

export async function cleanupPrecacheCaches() {
	const cacheNames = await caches.keys();
	for (const cacheName of cacheNames) {
		if (cacheName.startsWith(precachePrefix) && cacheName !== precacheCacheName) {
			await caches.delete(cacheName);
		}
	}
}
