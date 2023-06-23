import moment from "moment";
import {User} from 'firebase/auth';
import {parse, format} from 'date-fns';

export async function getDailyPriorities(user: User|null, d: moment.Moment): Promise<Array<DailyPriority>> {
	if (!user) {
		throw new Error(`User is undefined`);
	}

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

export async function setDailyPriorities(user: User|null, d: moment.Moment, priorities: Array<DailyPriority>) {
	if (!user) {
		throw new Error(`User is not defined`);
	}

	const token = await user.getIdToken();
	await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/priorities/forday/${d.format('YYYY-MM-DD')}`, {
		method: 'post',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(priorities),
	});
}

export async function getPrioritiesForDates(user: User, start: Date, end: Date): Promise<Array<DatePriorities>> {
	let datePriorities: Array<DatePriorities> = [];
	try {
		const token = await user.getIdToken();
		const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/priorities/fordates/${format(start, 'yyyy-MM-dd')}/${format(end, 'yyyy-MM-dd')}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		});
		const data = (await resp.json() as PriorityResponse);
		if (data.dates) {
			datePriorities = data.dates.map(d => {
				return {
					date: parse(d.date, 'yyyy-MM-dd', new Date()),
					priorities: d.priorities.filter(p => p.note.length > 0),
				};
			});
		}
	} catch (err) {
		console.error(`Fetch request failed: `, err);
		throw err;
	}
	return datePriorities;
}

export interface DailyPriority {
  note: string;
  order: number;
}

export interface DatePriorities {
  date: Date;
  priorities: Array<DailyPriority>;
}

interface PriorityResponse {
	dates: Array<{
		date: string;
		priorities: Array<DailyPriority>;
	}>;
}
