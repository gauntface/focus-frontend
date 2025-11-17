//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import { globalIgnores } from "eslint/config";

export default [
	globalIgnores(["old/", "take-screenshots.js"]),
	...tanstackConfig,
];
