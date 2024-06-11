let deferredPrompt: undefined | BeforeInstallPromptEvent;
let installed = false;

export function canPromptForInstall(): boolean {
	return !!deferredPrompt;
}

export async function performInstall(): Promise<void> {
	if (!deferredPrompt) {
		console.warn(`Perform install called without deferredPrompt`);
		return;
	}
	await deferredPrompt.prompt();
	deferredPrompt = undefined;
}

export function registerInstallPrompt() {
	if (installed) return;
	installed = true;

	window.addEventListener("beforeinstallprompt", (e) => {
		// Prevent the mini-infobar from appearing on mobile
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e as BeforeInstallPromptEvent;
	});

	window.addEventListener("appinstalled", () => {
		// Hide the app-provided install promotion
		// hideInstallPromotion();
		deferredPrompt = undefined;
		if (window.beampipe) {
			window.beampipe("web-app-installed");
		}
	});
}
