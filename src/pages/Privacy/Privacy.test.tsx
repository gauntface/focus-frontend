import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { Privacy } from "./Privacy";
import { routeTree } from "@/routeTree.gen";

// first create the router like usual
const router = createRouter({
	routeTree,
});

describe("Privacy", () => {
	test("renders privacy policy", async () => {
		render(<Privacy />, {
			wrapper: (props) => (
				<RouterContextProvider router={router}>
					{props.children}
				</RouterContextProvider>
			),
		});

		const main = await screen.getByRole("main");
		expect(main).toBeTruthy();

		// Check footer
		const footer = await screen.getByText("Support this Project");
		expect(footer).toBeTruthy();
	});
});
