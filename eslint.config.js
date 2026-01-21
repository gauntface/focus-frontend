//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import { globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default [
	globalIgnores([
		"old/",
		"take-screenshots.js",
		"eslint.config.js",
		"prettier.config.js",
	]),
	...tanstackConfig,
	{
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
		},
	},
];
