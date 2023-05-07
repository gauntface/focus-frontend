import { render, screen } from '@testing-library/react'
import { WeekSelector } from '../../components/WeekSelector/WeekSelector'
import '@testing-library/jest-dom'
import moment from 'moment'

jest.mock('next/router', () => {
	return {
		useRouter: () => {},
	};
});

describe('WeekSelector', () => {
	it('renders week selector', () => {
		render(<WeekSelector date={moment("2006-01-02")} />)

		// Check sign in button
		const prevWeekBtn = screen.getByLabelText('Previous week');
		expect(prevWeekBtn).toBeTruthy();
		expect(prevWeekBtn).toHaveAttribute('href', '/week/2005/53');

		const nextWeekBtn = screen.getByLabelText('Next week');
		expect(nextWeekBtn).toBeTruthy();
		expect(nextWeekBtn).toHaveAttribute('href', '/week/2006/2');

		const textEle = screen.getByText('January 2006 - Week 1');
		expect(textEle).toBeTruthy();
	})
})
