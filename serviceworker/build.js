import * as esbuild from 'esbuild';
import { readFile } from 'fs/promises';


const manifest = JSON.parse(await readFile('./.next/build-manifest.json', 'utf-8'));
const {polyfillFiles, pages} = manifest;

const allFiles = new Set();
polyfillFiles.forEach((f) => allFiles.add(f));

for (const pageFiles of Object.values(pages)) {
	pageFiles.forEach((f) => allFiles.add(f));
}
const precacheFiles = Array.from(allFiles).map((f) => `/_next/${f}`);

await esbuild.build({
	define: {
		'process.env.FOCUS_PRECACHE_FILES': JSON.stringify(precacheFiles),
		'process.env.FOCUS_PRECACHE_SUFFIX': `${Math.floor(new Date().getTime() / 1000)}`,
	},
	entryPoints: ['./serviceworker/sw.prod.ts'],
	bundle: true,
	minify: true,
	sourcemap: true,
	format: 'esm',
	outfile: './public/sw.js',
});

console.log('✅ Done.');
