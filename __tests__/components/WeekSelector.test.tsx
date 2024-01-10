import { render } from '@testing-library/react';
import { WeekSelector } from '../../components/WeekSelector/WeekSelector';
import { getByLabelText, getByText } from '../../__testutils__/screen';
import '@testing-library/jest-dom';

jest.mock('next/router', () => {
	return {
		useRouter: () => {},
	};
});

describe('WeekSelector', () => {
	it('renders week selector', async () => {
		render(<WeekSelector date={new Date(2006, 0, 2)} />);

		// Check sign in button
		const prevWeekBtn = await getByLabelText('Previous week');
		expect(prevWeekBtn).toBeTruthy();
		expect(prevWeekBtn).toHaveAttribute('href', '/week/2005/53');

		const nextWeekBtn = await getByLabelText('Next week');
		expect(nextWeekBtn).toBeTruthy();
		expect(nextWeekBtn).toHaveAttribute('href', '/week/2006/2');

		const textEle = await getByText('January 2006 - Week 1');
		expect(textEle).toBeTruthy();
	});

	it('renders week selector correctly between years', async () => {
		render(<WeekSelector date={new Date(2023, 11, 31)} />);

		// Check sign in button
		const prevWeekBtn = await getByLabelText('Previous week');
		expect(prevWeekBtn).toBeTruthy();
		expect(prevWeekBtn).toHaveAttribute('href', '/week/2023/52');

		const nextWeekBtn = await getByLabelText('Next week');
		expect(nextWeekBtn).toBeTruthy();
		expect(nextWeekBtn).toHaveAttribute('href', '/week/2024/2');

		const textEle = await getByText('January 2024 - Week 1');
		expect(textEle).toBeTruthy();
	});
});
