import { User } from "firebase/auth";
import { format } from "date-fns";

const API_DATE_FORMAT = "yyyy-MM-dd";

export async function getDailyNotes(
	user: User | null,
	d: Date,
): Promise<string> {
	if (!user) {
		throw new Error(`User is undefined`);
	}

	let notes = "";
	try {
		const token = await user.getIdToken();
		const resp = await fetch(
			`${import.meta.env.VITE_API_SERVER}/notes/forday/${format(d, API_DATE_FORMAT)}`,
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const data = await resp.json();
		if (data.notes) {
			notes = data.notes as string;
		}
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}

	return notes;
}

export async function setDailyNotes(user: User | null, d: Date, notes: string) {
	if (!user) {
		throw new Error(`User is undefined`);
	}

	try {
		const token = await user.getIdToken();
		await fetch(
			`${import.meta.env.VITE_API_SERVER}/notes/forday/${format(d, API_DATE_FORMAT)}`,
			{
				method: "post",
				headers: { Authorization: `Bearer ${token}` },
				body: JSON.stringify({ notes }),
			},
		);
	} catch (err) {
		console.error(`Fetch request failed: `, err);
	}
}

export interface DailyPriority {
	note: string;
	order: number;
}
