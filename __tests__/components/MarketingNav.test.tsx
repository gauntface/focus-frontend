import { render, screen } from '@testing-library/react';
import { MarketingNav } from '../../components/MarketingNav/MarketingNav';
import '@testing-library/jest-dom';

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

describe('MarketingNav', () => {
	it('renders sign in button', () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: null,
			loading: false,
		};
		const signinSpy = jest.spyOn(values, 'signIn');
		mockUseAuth.mockReturnValue(values);

		render(<MarketingNav />);

		// Check sign in button
		const signInBtn = screen.getByRole('button', {
			name: 'Sign In',
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(signinSpy).toBeCalled();
	});

	it('renders with sign out and tasks button', () => {
		const values: AuthProviderProps = {
			signIn: () => {},
			signOut: () => {},
			user: {
				email: 'example@example.com',
			},
			loading: false,
		};
		const signoutSpy = jest.spyOn(values, 'signOut');
		mockUseAuth.mockReturnValue(values);

		render(<MarketingNav />);

		// Check sign in button
		const signoutBtn = screen.getByRole('button', {
			name: 'Sign Out',
		});
		expect(signoutBtn).toBeTruthy();

		signoutBtn.click();
		expect(signoutSpy).toBeCalled();

		const tasksBtn = screen.getByRole('button', {
			name: 'Tasks',
		});
		expect(tasksBtn).toBeTruthy();
	});
});
