import styles from './DayTasks.module.css';
import { NotesArea } from '../../components/NotesArea/NotesArea';
import { User } from 'firebase/auth';
import { DailyPriority, getDailyPriorities, setDailyPriorities } from "../../models/priorities";
import {getDailyNotes, setDailyNotes} from "../../models/notes";

import {useEffect, useState} from 'react';

let timeoutID: NodeJS.Timeout;

export function DayTasks({date, user}: Props) {
	const [initialLoad, setInitialLoad] = useState<boolean>(true);

	const [priorities, setPriorities] = useState<Array<DailyPriority>>([
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
	]);

	const [notes, setNotes] = useState<string>('');

	useEffect(() => {
		(async () => {
			if (!user) {
				return;
			}
			const [ps, ns] = await Promise.all([
				getDailyPriorities(user, date),
				getDailyNotes(user, date),
			]);
			setPriorities(ps);

			setNotes(ns);

			setInitialLoad(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function onDailyPriorityChange(idx: number, e: string) {
		if (priorities[idx].note == e) {
			// Do not set priorities and trigger hooks if
			// nothing has acutally changed.
			return;
		}

		const ps = [...priorities];
		ps[idx].note = e;
		setPriorities(ps);

		clearTimeout(timeoutID);
		timeoutID = setTimeout(async () => {
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

	function onNotesChange(e: string) {
		if (notes == e) {
			return;
		}

		setNotes(e);

		clearTimeout(timeoutID);
		timeoutID = setTimeout(async () => {
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
		<div className={styles['c-dt']}>
			<section className={styles['c-dt__tasks-section']}>
				<h3>Tasks</h3>
				<ol className={styles['c-dt__tasks-list']}>
					{priorities.map((priority: DailyPriority, idx: number) => {
						return (<li key={idx} className={styles['c-dt__task']}>
							<NotesArea disabled={initialLoad} name={`priority-${idx}`} note={priority.note} onChange={(v: string) => onDailyPriorityChange(idx, v)} rows={1} />
						</li>);
					})}
				</ol>
			</section>

			<section className={styles['c-dt__notes-section']}>
				<h3>Notes</h3>
				<div className={styles['c-dt__notes']}>
					<NotesArea disabled={initialLoad} name={`notes`} note={notes}  onChange={(v: string) => onNotesChange(v)} rows={3} />
				</div>
			</section>
		</div>
	);
}

interface Props {
	date: moment.Moment;
	user: User;
}
