import "react-toastify/dist/ReactToastify.css";

import '../styles/variables/_colors.css';
import '../styles/variables/_fonts.css';
import '../styles/variables/_dimens.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { FocusAuthProvider } from '../old/contexts/Auth';
import { ToastContainer } from "react-toastify";
import { User } from "firebase/auth";
import { NextComponentType } from "next";
import {registerInstallPrompt} from '../old/controllers/app-banner';
import { registerSW } from "../old/controllers/service-worker";
import '../old/controllers/sentry';
import { useEffect } from "../old/node_modules/@types/react";


function FocusApp({
	Component,
	pageProps: { ...pageProps }
}: CustomAppProps) {
	useEffect(() => {
		registerInstallPrompt();
		registerSW();
	}, []);
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
