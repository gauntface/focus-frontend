import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
				<script async defer src="https://beampipe.io/js/tracker.js" data-beampipe-domain={process.env.NEXT_PUBLIC_BEAMPIPE_ANALYTICS}></script>
			</body>
		</Html>
	);
}
