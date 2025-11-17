import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { Footer } from "./Footer";
import type { User } from "firebase/auth";
import { routeTree } from "@/routeTree.gen";
import * as AuthContext from "@/contexts/Auth";
import { canPromptForInstall, performInstall } from "@/controllers/app-banner";

vi.mock("@/controllers/app-banner");

// Mock the auth context
const mockSignIn = vi.fn();
const mockSignOut = vi.fn();

const router = createRouter({
	routeTree,
});

describe("Footer", () => {
	test("should allow sign in", async () => {
		vi.spyOn(AuthContext, "useAuth").mockReturnValue({
			signIn: mockSignIn,
			signOut: mockSignOut,
			user: null,
			loading: false,
		});

		render(<Footer />, {
			wrapper: (props) => (
				<RouterContextProvider router={router}>
					{props.children}
				</RouterContextProvider>
			),
		});

		const signInBtn = await screen.getByRole("button", {
			name: "Sign In",
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(mockSignIn).toBeCalled();
	});

	test("renders Footer with install and sign out", async () => {
		vi.spyOn(AuthContext, "useAuth").mockReturnValue({
			signIn: mockSignIn,
			signOut: mockSignOut,
			user: {
				email: "example@example.com",
			} as User,
			loading: false,
		});

		vi.mocked(canPromptForInstall).mockReturnValue(true);
		const mockPerformInstall = vi
			.mocked(performInstall)
			.mockResolvedValue(undefined);

		render(<Footer />, {
			wrapper: (props) => (
				<RouterContextProvider router={router}>
					{props.children}
				</RouterContextProvider>
			),
		});

		// Check sign in button
		const signoutBtn = await screen.getByRole("button", {
			name: "Sign Out",
		});
		expect(signoutBtn).toBeTruthy();
		signoutBtn.click();
		expect(mockSignOut).toBeCalled();

		const installLink = await screen.getByText("Install App");
		expect(installLink).toBeTruthy();
		installLink.click();
		expect(mockPerformInstall).toBeCalled();
	});
});
