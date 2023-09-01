import * as Sentry from "@sentry/react";

Sentry.init({
	dsn: process.env.NEXT_SENTRY_DSN,
	integrations: [
		new Sentry.BrowserTracing({
			// Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
			tracePropagationTargets: ["localhost", /^https:\/\/*.gaunt.dev/],
		}),
		new Sentry.Replay(),
	],
	// Performance Monitoring
	tracesSampleRate: 0.1,
	// Session Replay
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
