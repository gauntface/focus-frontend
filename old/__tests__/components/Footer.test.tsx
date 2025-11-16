import "@testing-library/jest-dom";
import { Footer } from "../../components/Footer/Footer";
import { getByRole, getByText } from "../../__testutils__/screen";
import { render } from "@testing-library/react";

jest.mock("../../utils/firebaseClient", () => {
	return {};
});

import { AuthProviderProps, useAuth } from "../../../src/contexts/Auth";
jest.mock("../../contexts/Auth");
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock("next/router", () => {
	return {
		useRouter: () => {},
	};
});

import {
	canPromptForInstall,
	performInstall,
} from "../../../src/controllers/app-banner";
jest.mock("../../controllers/app-banner");
const mockCanPromptForInstall = canPromptForInstall as jest.MockedFunction<
	typeof canPromptForInstall
>;
const mockPerformInstall = performInstall as jest.MockedFunction<
	typeof performInstall
>;

describe("Footer", () => {
	it("renders Footer without install and sign in", async () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: null,
			loading: false,
		};
		const signinSpy = jest.spyOn(values, "signIn");
		mockUseAuth.mockReturnValue(values);
		mockCanPromptForInstall.mockReturnValue(false);

		render(<Footer />);

		// Check sign in button
		const signInBtn = await getByRole("button", {
			name: "Sign In",
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(signinSpy).toBeCalled();
	});

	it("renders Footer with install and sign out", async () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: {
				email: "example@example.com",
			},
			loading: false,
		};
		const signoutSpy = jest.spyOn(values, "signOut");
		mockUseAuth.mockReturnValue(values);
		mockCanPromptForInstall.mockReturnValue(true);

		render(<Footer />);

		// Check sign in button
		const signoutBtn = await getByRole("button", {
			name: "Sign Out",
		});
		expect(signoutBtn).toBeTruthy();
		signoutBtn.click();
		expect(signoutSpy).toBeCalled();

		const installLink = await getByText("Install App");
		expect(installLink).toBeTruthy();
		installLink.click();
		expect(mockPerformInstall).toBeCalled();
	});
});
