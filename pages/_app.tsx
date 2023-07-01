import "react-toastify/dist/ReactToastify.css";

import '../styles/variables/_colors.css';
import '../styles/variables/_fonts.css';
import '../styles/variables/_dimens.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { FocusAuthProvider } from '../contexts/Auth';
import { ToastContainer } from "react-toastify";
import { User } from "firebase/auth";
import { NextComponentType } from "next";
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

function FocusApp({
	Component,
	pageProps: { ...pageProps }
}: CustomAppProps) {
	return <FocusAuthProvider>
		<Component {...pageProps} />
		<ToastContainer
			position="bottom-right"
			newestOnTop={true}
		/>
	</FocusAuthProvider>;
}

export default FocusApp ;

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: User}
}
