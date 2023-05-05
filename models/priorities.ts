import moment from "moment";
import {User} from 'firebase/auth';

export async function getDailyPriorities(user: User, d: moment.Moment): Promise<Array<DailyPriority>> {
	let priorities: Array<DailyPriority> = [];
	try {
		const token = await user.getIdToken();
		const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/priorities/forday/${d.format('YYYY-MM-DD')}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await resp.json();
		if (data.priorities) {
			priorities = data.priorities as Array<DailyPriority>;
		}
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}

	while (priorities.length < 3) {
		priorities.push({
			note: '',
			order: priorities.length,
		});
	}

	return priorities;
}

export async function setDailyPriorities(user: User, d: moment.Moment, priorities: Array<DailyPriority>) {
	try {
		const token = await user.getIdToken();
		await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/priorities/forday/${d.format('YYYY-MM-DD')}`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(priorities),
		});
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}
}

export async function getPrioritiesForDates(user: User, start: moment.Moment, end: moment.Moment): Promise<Array<DatePriorities>> {
	let datePriorities: Array<DatePriorities> = [];
	try {
		const token = await user.getIdToken();
		const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/priorities/fordates/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		});
		const data = await resp.json();
		if (data.dates) {
			datePriorities = data.dates as Array<DatePriorities>;
			datePriorities = datePriorities.map(d => {
				d.priorities = d.priorities.filter(p => p.note.length > 0);
				return d
			});
		}
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}
	return datePriorities;
}

export interface DailyPriority {
  note: string;
  order: number;
}

export interface DatePriorities {
  date: string;
  priorities: Array<DailyPriority>;
}
