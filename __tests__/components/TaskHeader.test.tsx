import { render, screen } from '@testing-library/react';
import { TaskHeader } from '../../components/TaskHeader/TaskHeader';
import '@testing-library/jest-dom';

describe('TaskHeader', () => {
	it('renders header with intro and date', () => {
		render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: "Firstname Lastname"}} selectedView='day' />);

		const title = screen.getByText('Firstname');
		expect(title).toBeTruthy();

		const date = screen.getByText("Monday, January 2nd 2006");
		expect(date).toBeTruthy();
	});

	it('renders header with date', () => {
		render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: null}} selectedView='day' />);

		expect(() => screen.getByText('Hey, ')).toThrow();

		const date = screen.getByText("Monday, January 2nd 2006");
		expect(date).toBeTruthy();
	});

	it('renders header with date for week view', () => {
		const { container } = render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: "Firstname Lastname"}} selectedView='week' />);

		const title = screen.getByText('Firstname');
		expect(title).toBeTruthy();

		const date = screen.getByText("January 2nd 2006 - January 6th 2006");
		expect(date).toBeTruthy();

		const viewBtn = container.querySelector('.c-task-header__task--selected') as HTMLAnchorElement;
		expect(viewBtn).toBeTruthy();
		expect(viewBtn.href).toEqual("http://localhost/week/2006/1");
	});

	it('renders header with date for week view', () => {
		const { container } = render(<TaskHeader date={new Date(2006, 0, 2)} user={{displayName: "Firstname Lastname"}} selectedView='week' />);

		const title = screen.getByText('Firstname');
		expect(title).toBeTruthy();

		const date = screen.getByText("January 2nd 2006 - January 6th 2006");
		expect(date).toBeTruthy();

		const viewBtn = container.querySelector('.c-task-header__task--selected') as HTMLAnchorElement;
		expect(viewBtn).toBeTruthy();
		expect(viewBtn.href).toEqual("http://localhost/week/2006/1");
	});
});
