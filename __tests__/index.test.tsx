import { render, screen } from '@testing-library/react';
import Index from '../pages/index';
import '@testing-library/jest-dom';

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
	it('renders marketing page', () => {
		render(<Index />);

		// Check footer
		const footer = screen.getByText('Support this Project');
		expect(footer).toBeInTheDocument();

		// Check sign in button
		const signInBtns = screen.getAllByRole('button', {
			name: 'Sign In',
		});
		expect(signInBtns.length).toEqual(2);
	});
});
