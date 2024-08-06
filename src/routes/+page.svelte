<script lang="ts">
	import '$lib/styles/reset.css';
	import MarketingNav from '$lib/components/MarketingNav.svelte';
	import MarketingHero from '$lib/components/MarketingHero.svelte';
	import MarketingSplitSection from '$lib/components/MarketingSplitSection.svelte';
	import MarketingPurpose from '$lib/components/MarketingPurpose.svelte';
	import MarketingAbout from '$lib/components/MarketingAbout.svelte';
	import MarketingTry from '$lib/components/MarketingTry.svelte';
	import Footer from '$lib//components/Footer.svelte';
</script>

<MarketingNav />

<MarketingHero />

<MarketingSplitSection>
	<h3>We help you focus on the work that matters so you can achieve your goals.</h3>
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
