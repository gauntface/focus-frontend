import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { FocusAuthProvider } from "../contexts/Auth";
import { ToastContainer } from "react-toastify";
import { User } from "firebase/auth";
import { NextComponentType } from "next";
import { registerInstallPrompt } from "../../src/controllers/app-banner";
import { registerSW } from "../../src/controllers/service-worker";
import "../../src/controllers/sentry";
import { useEffect } from "react";

function FocusApp({ Component, pageProps: { ...pageProps } }: CustomAppProps) {
	useEffect(() => {
		registerInstallPrompt();
		registerSW();
	}, []);
	return (
		<FocusAuthProvider>
			<Component {...pageProps} />
			<ToastContainer position="bottom-right" newestOnTop={true} />
		</FocusAuthProvider>
	);
}

export default FocusApp;

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
	Component: NextComponentType & { auth?: User };
};
