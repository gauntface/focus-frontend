import { beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoogleAuthProvider, type User } from "firebase/auth";

import { useAuth } from "../../contexts/Auth";
import { SignInButton } from "./SignInButton";
import type { AuthProviderProps } from "../../contexts/Auth";

vi.mock("../../utils/firebaseClient", () => {
	return {};
});
vi.mock("../../contexts/Auth");

const mockUseAuth = vi.mocked(useAuth);

describe("SignInButton", () => {
	beforeEach(() => {
		cleanup();
	});

	test("renders sign in button", async () => {
		const user = userEvent.setup();
		const values: AuthProviderProps = {
			signIn: vi.fn(),
			signOut: vi.fn(),
			user: null,
			loading: false,
		};
		mockUseAuth.mockReturnValue(values);

		render(<SignInButton />);

		// Check sign in button
		const signInBtn = screen.getByRole("button", {
			name: "Sign In",
		});
		expect(signInBtn).toBeTruthy();

		await user.click(signInBtn);
		expect(values.signIn).toBeCalled();
	});

	test("renders sign out button", async () => {
		const user = userEvent.setup();
		const values: AuthProviderProps = {
			signIn: vi.fn(),
			signOut: vi.fn(),
			user: {
				email: "example@example.com",
				displayName: "Example User",
				getIdToken: () => Promise.resolve("example-id-token"),
			} as User,
			loading: false,
		};
		mockUseAuth.mockReturnValue(values);

		render(<SignInButton />);

		// Check sign out button
		const signOutBtn = screen.getByRole("button", {
			name: "Sign Out",
		});
		expect(signOutBtn).toBeTruthy();

		await user.click(signOutBtn);
		expect(values.signOut).toHaveBeenCalled();
	});

	test("renders sign in button with customization props", async () => {
		const user = userEvent.setup();
		const values: AuthProviderProps = {
			signIn: vi.fn(),
			signOut: vi.fn(),
			user: null,
			loading: false,
		};
		mockUseAuth.mockReturnValue(values);

		render(
			<SignInButton
				classModifier="diff-btn"
				signInText="Go"
				redirect="/other"
			/>,
		);

		// Check sign in button
		const signInBtn = screen.getByRole("button", {
			name: "Go",
		});
		expect(signInBtn).toBeTruthy();
		expect(signInBtn.classList[0]).toEqual("button--diff-btn");

		await user.click(signInBtn);
		expect(values.signIn).toBeCalledWith(new GoogleAuthProvider(), "/other");
	});
});
