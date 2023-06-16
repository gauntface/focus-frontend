import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';
import { useRouter } from 'next/router';
import {useEffect, useState, useRef} from 'react';

import { DailyPriority, getDailyPriorities, setDailyPriorities } from "../../models/priorities";
import {getDailyNotes, setDailyNotes} from "../../models/notes";
import {withAuth} from '../../utils/withAuth';
import { useAuth } from '../../contexts/Auth';
import { Footer } from '../../components/Footer/Footer';
import { TaskHeader } from '../../components/TaskHeader/TaskHeader';
import { DayTasks } from '../../components/DayTasks/DayTasks';
import { QuarterTracker } from "../../components/QuarterTracker/QuarterTracker";
import { DelayAPI } from '../../utils/useDelayedState';

const SAVE_TIMEOUT_MS = 2000;

const tasksDelay = new DelayAPI(SAVE_TIMEOUT_MS, 'DatePageSaveTasks', {
	pending: 'Saving tasks...',
	success: {
		render: 'Tasks saved',
		autoClose: 1200,
	},
	error: 'Failed to save tasks'
});
const notesDelay = new DelayAPI(SAVE_TIMEOUT_MS, 'DatePageSaveNotes', {
	pending: 'Saving notes...',
	success: {
		render: 'Notes saved',
		autoClose: 1200,
	},
	error: 'Failed to save notes',
});

const Day: NextPage = () => {
	const {user} = useAuth();
	const {query, isReady} = useRouter();

	const [loading, setLoading] = useState<boolean>(true);
	const [priorities, setPriorities] = useState<Array<DailyPriority>>(getEmptyPriorities());
	const [notes, setNotes] = useState<string>('');

	const dateString = query.date;
	const dateRef = useRef(dateString);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		dateRef.current = dateString;
		setLoading(true);

		(async () => {
			setPriorities(getEmptyPriorities());
			setNotes('');

			const date = moment(dateString);
			const [ps, ns] = await Promise.all([
				getDailyPriorities(user, date),
				getDailyNotes(user, date),
			]);

			if (dateRef.current != dateString) {
				return;
			}

			setPriorities(ps);
			setNotes(ns);
			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateString, isReady]);

	const date = moment(dateString);

	function onDailyPriorityChange(idx: number, e: string) {
		const ps = [...priorities];
		ps[idx].note = e;
		setPriorities(ps);

		tasksDelay.queue(async () => {
			await setDailyPriorities(user, date, ps);
		});
	}

	function onNotesChange(e: string) {
		setNotes(e);

		notesDelay.queue(async () => {
			await setDailyNotes(user, date, e);
		});
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
				<QuarterTracker date={date.toDate()} />
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
