import { render } from '@testing-library/react';
import Index from '../../pages/index';
import '@testing-library/jest-dom';
import { getByText, getAllByRole } from '../__testutils__/screen';

jest.mock('../contexts/Auth', () => {
	return {useAuth: () => {
		return {
			signIn: () => {},
			user: {},
		};
	}};
});

jest.mock('next/router', () => {
	return {
		useRouter: () => {},
	};
});

describe('Index', () => {
	it('renders marketing page', async () => {
		render(<Index />);

		// Check footer
		const footer = await getByText('Support this Project');
		expect(footer).toBeInTheDocument();

		// Check sign in button
		const signInBtns = await getAllByRole('button', {
			name: 'Sign In',
		});
		expect(signInBtns).toBeTruthy();
		expect(signInBtns.length).toEqual(2);
	});
});
