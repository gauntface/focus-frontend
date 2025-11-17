import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { Index } from "./Index";
import { routeTree } from "@/routeTree.gen";

// first create the router like usual
const router = createRouter({
	routeTree,
});

describe("Index", () => {
	test("renders marketing page", async () => {
		render(<Index />, {
			wrapper: (props) => (
				<RouterContextProvider router={router}>
					{props.children}
				</RouterContextProvider>
			),
		});

		// Check footer
		const footer = await screen.getByText("Support this Project");
		expect(footer).toBeTruthy();

		// Check sign in button
		const signInBtns = await screen.getAllByRole("button", {
			name: "Sign In",
		});
		expect(signInBtns).toBeTruthy();
		expect(signInBtns.length).toEqual(2);
	});
});
