import { describe, expect, test } from "vitest";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { Cookies } from "./Cookies";
import { routeTree } from "@/routeTree.gen";

// first create the router like usual
const router = createRouter({
	routeTree,
});

describe("Cookies", () => {
	test("renders cookie policy", async () => {
		render(<Cookies />, {
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
