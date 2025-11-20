/// <reference types="vitest/config" />

import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		devtools(),
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		viteReact(),
	],
	resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
	test: {
		environment: "jsdom",
		coverage: {
			provider: "v8",
		},
	},
});
