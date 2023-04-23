import styles from '../../styles/layouts/l-home.module.css';

import {useEffect, useState} from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import moment from 'moment';
import { useRouter } from 'next/router';

import {withAuth} from '../../utils/withAuth'
import { useAuth } from '../../contexts/Auth';
import { DailyPriority, getDailyPriorities, setDailyPriorities } from "../../models/priorities";
import {getDailyNotes, setDailyNotes} from "../../models/notes";
import { QuarterTracker } from '../../components/QuarterTracker/QuarterTracker'
import { NotesArea } from '../../components/NotesArea/NotesArea'
import { DefaultLayout } from '../../components/DefaultLayout/DefaultLayout';

let timeoutID: NodeJS.Timeout;

// TODO: This is turned gnarly with handling the User | null types.
//       Please tidy up this logic.

const Day: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();
	const dateString = router.query.date;

	const date = moment(dateString);

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
	const [loadingPriorities, setLoadingPriorities] = useState<boolean>(true);

	const [notes, setNotes] = useState<string>('');
	const [loadingNotes, setLoadingNotes] = useState<boolean>(true);

	const [faviconState, setFaviconState] = useState('');

	useEffect(() => {
		(async () => {
			if (!user) {
				return;
			}
			const [ps, ns] = await Promise.all([
				getDailyPriorities(user, date),
				getDailyNotes(user, date),
			])
			setPriorities(ps);
			setLoadingPriorities(false);

			setNotes(ns);
			setLoadingNotes(false);

			setInitialLoad(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Setup the favicon animation
	useEffect(() => {
		let prioritiesSet = true;
		for (const p of priorities) {
			if (p.note == '') {
				prioritiesSet = false;
				break;
			}
		}

		if (prioritiesSet) {
			setFaviconState('');
			return;
		}

		let fs = '';
		const id = setInterval(() => {
			fs = fs == '' ? 'off' : '';
			setFaviconState(fs);
		}, 3000);
		return () => clearInterval(id);
	}, [priorities]);

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
		setLoadingPriorities(true);
		timeoutID = setTimeout(async () => {
			// TODO: Handle no user correctly.
			if (!user) {
				return;
			}

			try {
				await setDailyPriorities(user, date, ps)
			} catch(err) {
				console.error('Failed to set daily priorities: ', e);
			} finally {
				setLoadingPriorities(false);
			}
		}, 2000);
	}

	function onNotesChange(e: string) {
		if (notes == e) {
			return;
		}

		setNotes(e);

		clearTimeout(timeoutID);
		setLoadingNotes(true);
		timeoutID = setTimeout(async () => {
			// TODO: Handle no user correctly.
			if (!user) {
				return;
			}

			try {
				await setDailyNotes(user, date, e)
			} catch(err) {
				console.error('Failed to set daily notes: ', e);
			} finally {
				setLoadingNotes(false);
			}
		}, 2000);
	}

	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
	}

	return (
		<div>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href={faviconState == '' ? '/favicon.ico' : `/favicon-${faviconState}.ico` } />
			</Head>

			<DefaultLayout spinning={initialLoad || loadingPriorities || loadingNotes} user={user} date={date} title={date.format('ddd, Do MMMM')}>
				<div className={styles['l-home__main']}>
					<section className={styles['l-home__priorities']}>
						<h2>Todays Focus</h2>
						<ol className={styles['l-home__priorities-list']}>
							{priorities.map((priority: DailyPriority, idx: number) => {
								return (<li key={idx} className={styles['l-home__priority-item']}>
									<NotesArea disabled={initialLoad} name={`priority-${idx}`} note={priority.note} onChange={(v: string) => onDailyPriorityChange(idx, v)} rows={1} />
								</li>)
							})}
						</ol>
					</section>

					<section className={styles['l-home__notes']}>
						<h2>Notes</h2>
						<NotesArea disabled={initialLoad} name={`notes`} note={notes}  onChange={(v: string) => onNotesChange(v)} rows={3} />
					</section>

					<span className={styles['l-home__weeks']}>Weeks in Q{date.quarter()} &apos;{date.format('YY')}</span>
					<div className={styles['l-home__quarter-counter']}><QuarterTracker date={date} /></div>
				</div>
			</DefaultLayout>
		</div>
	)
}

export default withAuth(Day)
