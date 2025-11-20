export async function registerSW() {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!navigator.serviceWorker) {
		return;
	}

	await navigator.serviceWorker.register("/sw.js", {
		scope: "/",
	});
}
