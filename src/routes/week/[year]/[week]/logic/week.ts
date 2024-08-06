import type { DatePriorities } from '$lib/logic/models/priorities';
import { add, sub, startOfWeek, endOfWeek } from 'date-fns';

export function getEmptyWeekDetails(date: Date): Array<DatePriorities> {
	const { start } = getWeekDates(date);
	const week: Array<DatePriorities> = Array(5).fill({});
	for (let i = 0; i < week.length; i++) {
		week[i] = {
			date: add(start, { days: i }),
			priorities: []
		};
	}
	return week;
}

function getWeekDates(date: Date) {
	const start = add(startOfWeek(date), { days: 1 });
	const end = sub(endOfWeek(date), { days: 1 });
	return { start, end };
}
