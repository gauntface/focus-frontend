import { render, screen } from '@testing-library/react';
import Privacy from '../pages/privacy';
import '@testing-library/jest-dom';

jest.mock('../contexts/Auth', () => {
	return {useAuth: () => {
		return {
			signIn: () => {},
			user: {},
		};
	}};
});

describe('Privacy', () => {
	it('renders privacy policy', () => {
		render(<Privacy />);

		const main = screen.getByRole('main');
		expect(main).toBeInTheDocument();

		// Check footer
		const footer = screen.getByText('Support this Project');
		expect(footer).toBeInTheDocument();
	});
});
