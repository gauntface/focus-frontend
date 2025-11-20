import { beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { useAuth } from "../../contexts/Auth";
import { MarketingNav } from "./MarketingNav";
import type { AuthProviderProps } from "../../contexts/Auth";
import type { User } from "firebase/auth";
import { routeTree } from "@/routeTree.gen";

vi.mock("../../contexts/Auth");

const mockUseAuth = vi.mocked(useAuth);

const router = createRouter({
	routeTree,
});

describe("MarketingNav", () => {
	beforeEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	const renderWithRouter = (component: React.ReactElement) => {
		return render(component, {
			wrapper: (props) => (
				<RouterContextProvider router={router}>
					{props.children}
				</RouterContextProvider>
			),
		});
	};

	test("renders sign in button when user is not logged in", () => {
		const values: AuthProviderProps = {
			signIn: vi.fn(),
			signOut: vi.fn(),
			user: null,
			loading: false,
		};
		mockUseAuth.mockReturnValue(values);

		renderWithRouter(<MarketingNav />);

		const signInBtn = screen.getByRole("button", {
			name: "Sign In",
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(values.signIn).toHaveBeenCalled();
	});

	test("renders with sign out and tasks button when user is logged in", () => {
		const values: AuthProviderProps = {
			signIn: vi.fn(),
			signOut: vi.fn(),
			user: {
				email: "example@example.com",
			} as User,
			loading: false,
		};
		mockUseAuth.mockReturnValue(values);

		renderWithRouter(<MarketingNav />);

		const signoutBtn = screen.getByRole("button", {
			name: "Sign Out",
		});
		expect(signoutBtn).toBeTruthy();

		signoutBtn.click();
		expect(values.signOut).toHaveBeenCalled();

		const tasksBtn = screen.getByRole("button", {
			name: "Tasks",
		});
		expect(tasksBtn).toBeTruthy();
	});
});
