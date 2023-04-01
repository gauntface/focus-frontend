import { render, screen } from '@testing-library/react'
import Cookies from '../pages/cookies'
import '@testing-library/jest-dom'

jest.mock('../contexts/Auth', () => {
	return {useAuth: () => {
		return {
			signIn: () => {},
			user: {},
		};
	}};
});

describe('Cookies', () => {
	it('renders cookie policy', () => {
		render(<Cookies />)

		const main = screen.getByRole('main');
		expect(main).toBeInTheDocument();

		// Check footer
		const footer = screen.getByText('Support this Project');
		expect(footer).toBeInTheDocument();
	})
})
