import { render } from '@testing-library/react';
import { QuarterTracker } from '../../components/QuarterTracker/QuarterTracker';
import '@testing-library/jest-dom';
import { getByText } from '../../__testutils__/screen';

describe('QuarterTracker', () => {
	it('renders QuarterTracker', async () => {
		const { container } = render(<QuarterTracker date={new Date(2006, 0, 2)} />);

		// Check sign in button
		const progressText = await getByText("Progress in Q1 '06");
		expect(progressText).toBeTruthy();

		const weeksText = await getByText("1 of 12");
		expect(weeksText).toBeTruthy();

		const progressBar = container.querySelector('.c-qt__prog') as HTMLElement;
		expect(progressBar?.style.width).toEqual('0%');
	});

	it('renders QuarterTracker in mid quarter', async () => {
		const { container } = render(<QuarterTracker date={new Date(2006, 1, 1)} />);

		// Check sign in button
		const progressText = await getByText("Progress in Q1 '06");
		expect(progressText).toBeTruthy();

		const weeksText = await getByText("5 of 12");
		expect(weeksText).toBeTruthy();

		const progressBar = container.querySelector('.c-qt__prog') as HTMLElement;
		expect(progressBar?.style.width).toEqual('33%');
	});
});
