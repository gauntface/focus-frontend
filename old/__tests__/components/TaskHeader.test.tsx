import { render, screen, waitFor } from '@testing-library/react';
import { TaskHeader } from '../../components/TaskHeader/TaskHeader';
import { getByText } from '../../__testutils__/screen';
import '@testing-library/jest-dom';

describe('TaskHeader', () => {
	it('renders header with intro and date', async () => {
		render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: "Firstname Lastname"}} selectedView='day' />);

		const title = await getByText('Firstname');
		expect(title).toBeTruthy();

		const date = await getByText("Monday, January 2nd 2006");
		expect(date).toBeTruthy();
	});

	it('renders header with date', async () => {
		render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: null}} selectedView='day' />);

		expect(() => screen.getByText('Hey, ')).toThrow();

		const date = await getByText("Monday, January 2nd 2006");
		expect(date).toBeTruthy();
	});

	it('renders header with date for week view', async () => {
		const { container } = render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: "Firstname Lastname"}} selectedView='week' />);

		const title = await getByText('Firstname');
		expect(title).toBeTruthy();

		const date = await getByText("January 2nd 2006 - January 6th 2006");
		expect(date).toBeTruthy();

		await waitFor(() => container.querySelector('.c-task-header__task--selected'));
		const viewBtn = container.querySelector('.c-task-header__task--selected') as HTMLAnchorElement;
		expect(viewBtn).toBeTruthy();
		expect(viewBtn.href).toEqual("http://localhost/week/2006/1");
	});

	it('renders header with date for week view', async () => {
		const { container } = render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: "Firstname Lastname"}} selectedView='week' />);

		const title = await getByText('Firstname');
		expect(title).toBeTruthy();

		const date = await getByText("January 2nd 2006 - January 6th 2006");
		expect(date).toBeTruthy();

		await waitFor(() => container.querySelector('.c-task-header__task--selected'));
		const viewBtn = container.querySelector('.c-task-header__task--selected') as HTMLAnchorElement;
		expect(viewBtn).toBeTruthy();
		expect(viewBtn.href).toEqual("http://localhost/week/2006/1");
	});
});
