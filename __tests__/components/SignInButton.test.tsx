import { render, screen } from '@testing-library/react'
import { SignInButton } from '../../components/SignInButton/SignInButton'
import '@testing-library/jest-dom'
import { GoogleAuthProvider } from "firebase/auth";

jest.mock('../../utils/firebaseClient', () => {
	return {};
});

import {AuthProviderProps, useAuth} from '../../contexts/Auth';
jest.mock('../../contexts/Auth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock('next/router', () => {
	return {
		useRouter: () => {},
	};
});

describe('SignInButton', () => {
	it('renders sign in button', () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: null,
			loading: false,
		};
		const signinSpy = jest.spyOn(values, 'signIn');
		mockUseAuth.mockReturnValue(values);

		render(<SignInButton />)

		// Check sign in button
		const signInBtn = screen.getByRole('button', {
			name: 'Sign In',
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(signinSpy).toBeCalled();
	})

	it('renders sign out button', () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: {
				email: 'example@example.com',
				displayName: 'Example User',
				getIdToken: async () => "example-id-token",
			},
			loading: false,
		};
		const signoutSpy = jest.spyOn(values, 'signOut');
		mockUseAuth.mockReturnValue(values);

		render(<SignInButton />)

		// Check sign in button
		const signInBtn = screen.getByRole('button', {
			name: 'Sign Out',
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(signoutSpy).toHaveBeenCalled();
	})

	it('renders sign in button with customization props', () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: null,
			loading: false,
		};
		const signinSpy = jest.spyOn(values, 'signIn');
		mockUseAuth.mockReturnValue(values);

		render(<SignInButton classModifier="diff-btn" signInText='Go' redirect = "/other" />)

		// Check sign in button
		const signInBtn = screen.getByRole('button', {
			name: 'Go',
		});
		expect(signInBtn).toBeTruthy();
		expect(signInBtn.classList[0]).toEqual('button--diff-btn');

		signInBtn.click();
		expect(signinSpy).toBeCalledWith(new GoogleAuthProvider(), "/other");
	})
})