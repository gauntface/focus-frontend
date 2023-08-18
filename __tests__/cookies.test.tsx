import { render } from '@testing-library/react';
import Cookies from '../pages/cookies';
import '@testing-library/jest-dom';
import { getByRole, getByText } from '../__testutils__/screen';

jest.mock('../contexts/Auth', () => {
	return {useAuth: () => {
		return {
			signIn: () => {},
			user: {},
		};
	}};
});

describe('Cookies', () => {
	it('renders cookie policy', async () => {
		render(<Cookies />);

		const main = await getByRole('main');
		expect(main).toBeInTheDocument();

		// Check footer
		const footer = await getByText('Support this Project');
		expect(footer).toBeInTheDocument();
	});
});
