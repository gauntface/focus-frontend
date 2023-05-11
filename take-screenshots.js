import puppeteer from 'puppeteer';

async function homeScreenshot(page) {
	await page.goto('http://localhost:3000/demo/day', {
		waitUntil: 'networkidle0',
	});

	await page.waitForSelector('#c-dt');
	const element = await page.$('#c-dt');

	await element.screenshot({
		path: 'public/marketing/screenshots/day.png',
		omitBackground: true,
		captureBeyondViewport: true,
	});
}

async function weekScreenshot(page) {
	await page.goto('http://localhost:3000/demo/week', {
		waitUntil: 'networkidle0',
	});

	await page.waitForSelector('#c-wt');
	const element = await page.$('#c-wt');

	await element.screenshot({
		path: 'public/marketing/screenshots/week.png',
		omitBackground: true,
		captureBeyondViewport: true,
	});
}

const browser = await puppeteer.launch({
	headless: false, // "new",
});
const page = await browser.newPage();

// Set screen size
await page.setViewport({width: 1080, height: 1080});

await homeScreenshot(page);
await weekScreenshot(page);

await browser.close();
