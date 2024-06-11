import {startOfWeek, endOfWeek, add, sub, format} from 'date-fns';
import type { ViewSelection } from '../components/TaskHeader.svelte';

export function dateHeading(selectedView: ViewSelection, date: Date) {
	switch (selectedView) {
	case 'day':
		return format(date, 'EEEE, MMMM do yyyy');
	case 'week': {
		const start = add(startOfWeek(date), {days: 1});
		const end = sub(endOfWeek(date), {days: 1});
		return `${format(start, 'MMMM do yyyy')} - ${format(end, 'MMMM do yyyy')}`;
	}
	}
}
