/// <reference lib="WebWorker" />

import { Route, registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupPrecacheCaches, getPrecacheFiles, precacheFiles } from './libs/precache';

export type {};
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', function(event) {
	event.waitUntil(precacheFiles());
});

async function activate() {
	await cleanupPrecacheCaches();
	await self.clients.claim();
}

self.addEventListener('activate', function(event) {
	event.waitUntil(activate());
});

const precacheRouter = new Route(({ url }) => {
	return getPrecacheFiles().includes(url.pathname);
}, async ({request}) => {
	const res = await caches.match(request, { ignoreSearch: true});
	if (res) {
		return res;
	}
	return fetch(request);
});
registerRoute(precacheRouter);

const imageRoute = new Route(({ request, sameOrigin }) => {
	return sameOrigin && request.destination === 'image';
}, new CacheFirst());
registerRoute(imageRoute);

const fontRoute = new Route(({ request }) => {
	return request.destination === 'font';
}, new CacheFirst({
	cacheName: 'focus-fonts',
	plugins: [
		new ExpirationPlugin({
			// Cache for a maximum of a month
			maxAgeSeconds: 60 * 60 * 24 * 30,
			// Cache a max of 10 requests
			maxEntries: 10,
		}),
	],
}));
registerRoute(fontRoute);

const pageRoutes = new Route(({ url, sameOrigin }) => {
	return sameOrigin && (
		url.pathname == "/" ||
		url.pathname.startsWith("/home") ||
		url.pathname.startsWith("/week") ||
		url.pathname.startsWith("/day")
	);
}, new StaleWhileRevalidate());
registerRoute(pageRoutes);
