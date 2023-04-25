import { render, screen } from '@testing-library/react'
import { TaskHeader } from '../../components/TaskHeader/TaskHeader'
import '@testing-library/jest-dom'
import moment from 'moment';

describe('TaskHeader', () => {
	it('renders header with intro and date', () => {
		render(<TaskHeader date={moment("2006-01-02")} user={{displayName: "Firstname Lastname"}} selectedView='day' />)

		const title = screen.getByText('Firstname');
		expect(title).toBeTruthy();

        const date = screen.getByText('Today is Monday, January 2nd 2006');
		expect(date).toBeTruthy();
	})

    it('renders header with date', () => {
		render(<TaskHeader date={moment("2006-01-02")} user={{}} selectedView='day' />)

		expect(() => screen.getByText('Hey, ')).toThrow();

        const date = screen.getByText('Today is Monday, January 2nd 2006');
		expect(date).toBeTruthy();
	})
})