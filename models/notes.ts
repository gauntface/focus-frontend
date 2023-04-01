import moment from "moment";
import {User} from 'firebase/auth';

export async function getDailyNotes(user: User, d: moment.Moment): Promise<string> {
	let notes = '';
	try {
		const token = await user.getIdToken();
		const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/notes/forday/${d.format('YYYY-MM-DD')}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await resp.json();
		if (data.notes) {
			notes = data.notes as string;
		}
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}

	return notes;
}

export async function setDailyNotes(user: User, d: moment.Moment, notes: string) {
	try {
		const token = await user.getIdToken();
		await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/notes/forday/${d.format('YYYY-MM-DD')}`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				notes,
			}),
		});
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}
}

export interface DailyPriority {
  note: string;
  order: number;
}