import type { MetaFunction } from "@remix-run/node";
import { Footer } from '~/components/Footer/Footer';
import { MarketingNav } from '~/components/marketing/MarketingNav/MarketingNav';
import { MarketingHero } from '~/components/marketing/MarketingHero/MarketingHero';
import { MarketingSplitSection } from '~/components/marketing/MarketingSplitSection/MarketingSplitSection';
import { MarketingPurpose } from '~/components/marketing/MarketingPurpose/MarketingPurpose';
import { MarketingAbout } from '~/components/marketing/MarketingAbout/MarketingAbout';
import { MarketingTry } from '~/components/marketing/MarketingTry/MarketingTry';

export const meta: MetaFunction = () => {
  return [
    { title: "Focus" },
    { name: "description", content: "Focus is a simple tool to help you plan and focus on your work" },
		{
      tagName: "link",
      rel: "manifest",
      href: "/manifest.json",
    },
		{
      tagName: "link",
      rel: "apple-touch-icon",
      href: "/logo/maskable-logo-180.png",
    },
		{
      name: "theme-color",
      href: "#ffe9e1",
    },
		{
      name: "icon",
      href: "/favicon.ico",
    },
  ];
};

export default function Index() {
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
				<div><img src="/marketing/screenshots/day.png" alt="Screenshot of the day view of focus" width={1080} height={800} /></div>
				<h3>A simple day-to-day view to set your priorities and add notes</h3>
			</MarketingSplitSection>

			<MarketingSplitSection>
				<h3>Get an easy overview of your tasks for the week</h3>
				<div><img src="/marketing/screenshots/week.png" alt="Screenshot of the week view of focus" width={1080} height={800} /></div>
			</MarketingSplitSection>

			<MarketingTry />

			<Footer />
		</>
  );
}
