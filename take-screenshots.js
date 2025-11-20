import puppeteer from "puppeteer";

const BASE_URL = "http://localhost:5173";

async function homeScreenshot(page) {
	await page.goto(`${BASE_URL}/demo/day`, { waitUntil: "networkidle0" });

	await page.waitForSelector("#c-dt");
	const element = await page.$("#c-dt");

	await element.screenshot({
		path: "public/marketing/screenshots/day.png",
		omitBackground: true,
		captureBeyondViewport: true,
	});
}

async function weekScreenshot(page) {
	await page.goto(`${BASE_URL}/demo/week`, { waitUntil: "networkidle0" });

	await page.waitForSelector("#c-wt");
	const element = await page.$("#c-wt");

	await element.screenshot({
		path: "public/marketing/screenshots/week.png",
		omitBackground: true,
		captureBeyondViewport: true,
	});
}

const browser = await puppeteer.launch({
	headless: false, // "new",
});
const page = await browser.newPage();

// Set screen size
await page.setViewport({ width: 1080, height: 1080 });

await homeScreenshot(page);
await weekScreenshot(page);

await browser.close();
