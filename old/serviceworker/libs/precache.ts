const precachePrefix = 'focus-precache';
export const precacheCacheName = `${precachePrefix}${FOCUS_PRECACHE_SUFFIX || ''}`;

export function getPrecacheFiles(): Array<string> {
	if (FOCUS_PRECACHE_FILES) {
		return FOCUS_PRECACHE_FILES;
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
