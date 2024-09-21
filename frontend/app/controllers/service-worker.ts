export async function registerSW() {
	if (!navigator.serviceWorker) {
		return;
	}

	await navigator.serviceWorker.register('/sw.js', {
		scope: '/',
	});
}
