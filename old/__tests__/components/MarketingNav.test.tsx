import { render, screen } from '@testing-library/react';
import { MarketingNav } from '../../components/MarketingNav/MarketingNav';
import '@testing-library/jest-dom';

import { useAuth} from '../../contexts/Auth';
import { getByRole } from '../../__testutils__/screen';
import type {AuthProviderProps} from '../../contexts/Auth';

jest.mock('../../utils/firebaseClient', () => {
	return {};
});
jest.mock('../../contexts/Auth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock('next/router', () => {
	return {
		useRouter: () => {},
	};
});

describe('MarketingNav', () => {
	it('renders sign in button', async () => {
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
		const signInBtn = await getByRole('button', {
			name: 'Sign In',
		});
		expect(signInBtn).toBeTruthy();

		signInBtn.click();
		expect(signinSpy).toBeCalled();
	});

	it('renders with sign out and tasks button', async () => {
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
		const signoutBtn = await getByRole('button', {
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
