//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import { globalIgnores } from "eslint/config";

export default [
	globalIgnores([
		"old/",
		"take-screenshots.js",
		"eslint.config.js",
		"prettier.config.js",
	]),
	...tanstackConfig,
];
