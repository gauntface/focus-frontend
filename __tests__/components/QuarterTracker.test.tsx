import { render, screen } from '@testing-library/react'
import { QuarterTracker } from '../../components/QuarterTracker/QuarterTracker'
import '@testing-library/jest-dom'
import moment from 'moment';

jest.mock('moment', () => {
	const actualMoment = jest.requireActual('moment');
	return (date: string) => {
		if (date) {
			return actualMoment(date);
		}
		// Make it act as though it's a specific day instead of "now"
		return actualMoment("2006-01-01");
	}
});

describe('QuarterTracker', () => {
	it('renders QuarterTracker', () => {
		const { container } = render(<QuarterTracker date={moment("2006-01-02")} />)

		// Check sign in button
		const progressText = screen.getByText("Progress in Q1 '06");
		expect(progressText).toBeTruthy();

		const weeksText = screen.getByText("1 of 12");
		expect(weeksText).toBeTruthy();

		const progressBar = container.querySelector('.c-qt__prog') as HTMLElement;
		expect(progressBar?.style.width).toEqual('0%');
	})

	it('renders QuarterTracker in mid quarter', () => {
		const { container } = render(<QuarterTracker date={moment("2006-02-01")} />)

		// Check sign in button
		const progressText = screen.getByText("Progress in Q1 '06");
		expect(progressText).toBeTruthy();

		const weeksText = screen.getByText("5 of 12");
		expect(weeksText).toBeTruthy();

		const progressBar = container.querySelector('.c-qt__prog') as HTMLElement;
		expect(progressBar?.style.width).toEqual('33%');
	})
})