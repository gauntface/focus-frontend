import type { NextPage } from 'next';
import Image from 'next/image';
import { Footer } from '../components/Footer/Footer';
import { MarketingNav } from '../components/MarketingNav/MarketingNav';
import { MarketingHero } from '../components/MarketingHero/MarketingHero';
import { MarketingSplitSection } from '../components/MarketingSplitSection/MarketingSplitSection';
import { MarketingPurpose } from '../components/MarketingPurpose/MarketingPurpose';
import { MarketingAbout } from '../components/MarketingAbout/MarketingAbout';
import { MarketingTry } from '../components/MarketingTry/MarketingTry';

const Index: NextPage = () => {
	return (
		<>
			<MarketingNav />

			<MarketingHero />

			<MarketingSplitSection>
				<h3>We help you focus on the work that matters so you can achieve your goals.</h3>
				<MarketingPurpose />
			</MarketingSplitSection>

			<MarketingAbout />

			<MarketingSplitSection>
				<div><Image src="/marketing/screenshots/day.png" alt="Screenshot of the day view of focus" width={1080} height={800} /></div>
				<h3>A simple day-to-day view to set your priorities and add notes</h3>
			</MarketingSplitSection>

			<MarketingSplitSection>
				<h3>Get an easy overview of your tasks for the week</h3>
				<div><Image src="/marketing/screenshots/week.png" alt="Screenshot of the week view of focus" width={1080} height={800} /></div>
			</MarketingSplitSection>

			<MarketingTry />

			<Footer />
		</>
	);
};

export default Index;
