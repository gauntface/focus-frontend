/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#ffd6cf"></meta>
			</Head>
			<body>
				<Main />
				<NextScript />
				<script async defer src="https://beampipe.io/js/tracker.js" data-beampipe-domain={process.env.NEXT_PUBLIC_BEAMPIPE_ANALYTICS}></script>
			</body>
		</Html>
	);
}
