import { render } from '@testing-library/react';
import Privacy from '../../pages/privacy';
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

describe('Privacy', () => {
	it('renders privacy policy', async () => {
		render(<Privacy />);

		const main = await getByRole('main');
		expect(main).toBeInTheDocument();

		// Check footer
		const footer = await getByText('Support this Project');
		expect(footer).toBeInTheDocument();
	});
});
