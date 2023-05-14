import "react-toastify/dist/ReactToastify.css";

import '../styles/variables/_colors.css';
import '../styles/variables/_fonts.css';
import '../styles/variables/_dimens.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { FocusAuthProvider } from '../contexts/Auth';
import { ToastContainer } from "react-toastify";


function MyApp({
	Component,
	pageProps: { ...pageProps }
}: AppProps) {
	return <FocusAuthProvider>
		<Component {...pageProps} />
		<ToastContainer
			position="bottom-right"
			newestOnTop={true}
		/>
	</FocusAuthProvider>;
}

export default MyApp;
