import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';

import { DailyPriority, getDailyPriorities, setDailyPriorities } from "../../models/priorities";
import {getDailyNotes, setDailyNotes} from "../../models/notes";
import {withAuth} from '../../utils/withAuth';
import { useAuth } from '../../contexts/Auth';
import { Footer } from '../../components/Footer/Footer';
import { TaskHeader } from '../../components/TaskHeader/TaskHeader';
import { DayTasks } from '../../components/DayTasks/DayTasks';
import { QuarterTracker } from "../../components/QuarterTracker/QuarterTracker";

// TODO: This is turned gnarly with handling the User | null types.
//       Please tidy up this logic.

const Day: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();
	const dateString = router.query.date;
	const date = moment(dateString);

	const [loading, setLoading] = useState<boolean>(true);
	const [priorities, setPriorities] = useState<Array<DailyPriority>>(getEmptyPriorities());
	const [notes, setNotes] = useState<string>('');

	useEffect(() => {
		setPriorities(getEmptyPriorities());
		setNotes('');

		// TODO: Handle no user correctly.
		if (!user) {
			throw new Error(`User is undefined`);
		}

		(async () => {
			const [ps, ns] = await Promise.all([
				getDailyPriorities(user, date),
				getDailyNotes(user, date),
			]);
			setPriorities(ps);
			setNotes(ns);
			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateString]);

	// TODO: Handle no user correctly.
	if (!user) {
		throw new Error(`User is undefined`);
	}

	let priorityTimeoutID: NodeJS.Timeout;
	function onDailyPriorityChange(idx: number, e: string) {
		if (priorities[idx].note == e) {
			// Do not set priorities and trigger hooks if
			// nothing has acutally changed.
			return;
		}

		const ps = [...priorities];
		ps[idx].note = e;
		setPriorities(ps);

		clearTimeout(priorityTimeoutID);
		priorityTimeoutID = setTimeout(async () => {
			// TODO: Handle no user correctly.
			if (!user) {
				return;
			}

			try {
				await setDailyPriorities(user, date, ps);
			} catch(err) {
				console.error('Failed to set daily priorities: ', e);
			}
		}, 2000);
	}

	let notesTimeoutID: NodeJS.Timeout;
	function onNotesChange(e: string) {
		if (notes == e) {
			return;
		}

		setNotes(e);

		clearTimeout(notesTimeoutID);
		notesTimeoutID = setTimeout(async () => {
			// TODO: Handle no user correctly.
			if (!user) {
				return;
			}

			try {
				await setDailyNotes(user, date, e);
			} catch(err) {
				console.error('Failed to set daily notes: ', e);
			}
		}, 2000);
	}

	return (
		<div>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href={'/favicon.ico' } />
			</Head>

			<div>
				<TaskHeader user={user} date={date} selectedView="day" />
				<QuarterTracker date={date} />
				<DayTasks priorities={priorities} notes={notes} loading={loading} onNotesChange={onNotesChange} onDailyPriorityChange={onDailyPriorityChange} />
				<Footer />
			</div>
		</div>
	);
};

function getEmptyPriorities() {
	return [
		{
			note: '',
			order: 0,
		}, {
			note: '',
			order: 0,
		}, {
			note: '',
			order: 0,
		}
	];
}

export default withAuth(Day);
