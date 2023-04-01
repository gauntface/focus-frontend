import type { NextPage } from 'next'
import Head from 'next/head'
import LegalPage from '../components/LegalPage/LegalPage'

const PrivacyPolicy: NextPage = () => {
	return (
		<LegalPage>
			<Head>
				<title>Cookies</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Cookies</h1>
			<p>Last updated: Mar 12, 2023</p>

			<h2>Required Cookies</h2>

			<p>We strive to only store cookies that are necessary to make This
        tool function correctly.
			</p>

			<p>At the time of writing the only cookies we use are the cookies created
        by <a href="https://firebase.google.com">Firebase/Google</a>, which are
        used for authentication.
			</p>

			<h2>Analytics and Tracking</h2>

			<p>Beampipe is used to get analytics on Focuses usage. We have selected
        Beampipe due to it&apos;s privacy focus.
			</p>
      
			<p>You can view the data we track <a href="https://app.beampipe.io/domain/focus.gaunt.dev">here</a>.</p>
		</LegalPage>
	)
}

export default PrivacyPolicy
