import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer/Footer'
import MarketingNav from '../components/MarketingNav/MarketingNav'
import MarketingHero from '../components/MarketingHero/MarketingHero'
import MarketingSplitSection from '../components/MarketingSplitSection/MarketingSplitSection'
import MarketingPurpose from '../components/MarketingPurpose/MarketingPurpose'
import MarketingAbout from '../components/MarketingAbout/MarketingAbout'
import MarketingTry from '../components/MarketingTry/MarketingTry'

const Index: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MarketingNav />

			<MarketingHero />

			<MarketingSplitSection>
				<h2>We help you focus on the work that matters so you can achieve your goals.</h2>
				<MarketingPurpose />
			</MarketingSplitSection>

			<MarketingAbout />

			<MarketingSplitSection>
				<div>TODO: Add Image</div>
				<h2>A simple day-to-day view to set your priorities and add notes</h2>
			</MarketingSplitSection>

			<MarketingSplitSection>
				<h2>Get an easy overview of your tasks for the week</h2>
				<div>TODO: Add Image</div>
			</MarketingSplitSection>

			<MarketingTry />

			<Footer />
		</div>
	)
}

export default Index
