import { Footer } from "@/components/Footer/Footer";
import { MarketingAbout } from "@/components/MarketingAbout/MarketingAbout";
import { MarketingHero } from "@/components/MarketingHero/MarketingHero";
import { MarketingNav } from "@/components/MarketingNav/MarketingNav";
import { MarketingPurpose } from "@/components/MarketingPurpose/MarketingPurpose";
import { MarketingSplitSection } from "@/components/MarketingSplitSection/MarketingSplitSection";
import { MarketingTry } from "@/components/MarketingTry/MarketingTry";

export function Index() {
	return (
		<>
			<MarketingNav />

			<MarketingHero />

			<MarketingSplitSection>
				<h3>
					We help you focus on the work that matters so you can achieve your
					goals.
				</h3>
				<MarketingPurpose />
			</MarketingSplitSection>

			<MarketingAbout />

			<MarketingSplitSection>
				<div>
					<img
						src="/marketing/screenshots/day.png"
						alt="Screenshot of the day view of focus"
						width={1080}
						height={800}
					/>
				</div>
				<h3>A simple day-to-day view to set your priorities and add notes</h3>
			</MarketingSplitSection>

			<MarketingSplitSection>
				<h3>Get an easy overview of your tasks for the week</h3>
				<div>
					<img
						src="/marketing/screenshots/week.png"
						alt="Screenshot of the week view of focus"
						width={1080}
						height={800}
					/>
				</div>
			</MarketingSplitSection>

			<MarketingTry />

			<Footer />
		</>
	);
}
