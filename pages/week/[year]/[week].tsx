import overviewdays from '../../../styles/components/c-overview-days.module.css';

import type { NextPage } from 'next'
import Link from 'next/link';
import Head from 'next/head'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react';
import moment from 'moment';

import { useAuth } from '../../../contexts/Auth';
import { DailyPriority, DatePriorities, getPrioritiesForDates } from "../../../models/priorities";
import { DefaultLayout } from '../../../components/DefaultLayout/DefaultLayout';

const Week: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();
	const { year, week } = router.query;

	let yearNum, weekNum;
	if (typeof year !== 'string') {
		yearNum = moment().year();
	} else {
		yearNum = parseInt(year, 10)
	}

	if (typeof week !== 'string') {
		weekNum = moment().week();
	} else {
		weekNum = parseInt(week, 10);
	}

	const d = moment(`${yearNum}W${weekNum.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false
	})}`);

	const [datePriorities, setDatePriorities] = useState<Array<DatePriorities>>([]);
	const [loadingPriorities, setLoadingPriorities] = useState<boolean>(true);


	useEffect(() => {
		(async () => {
			// TODO: Handle no user correctly.
			if (!user) {
				return;
			}

			// .startOf() and .endOf() mutate the original object, so you need
			// to make a copy of the date
			const dates = await getPrioritiesForDates(user, moment(d.startOf('week')), moment(d.endOf('week')));
			setDatePriorities(dates);
			setLoadingPriorities(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
	}

	return (
		<div>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<DefaultLayout user={user} date={d} spinning={loadingPriorities} title={`Week ${week}, ${year}`} subtitle={`${d.startOf('week').format('Do MMMM')} - ${d.endOf('week').format('Do MMMM')}`}>
				<div className={overviewdays['c-overview-days']}>
					{datePriorities.map((dps: DatePriorities, idx: number) => {
						return (
							<div key={idx}>
								<h3><Link href={`/day/${date(dps.date)}`} key={dps.date.toString()}>{dayOfWeek(dps.date)}</Link></h3>
								<ol>
									{minPriorities(dps.priorities).map((priority, idx) => {
										return (<li key={idx}>{priority.note}</li>)
									})}
								</ol>
							</div>
						);
					})}
				</div>
			</DefaultLayout>
		</div>
	);
}

function dayOfWeek(date: string) {
	const d = moment(date);
	return d.format('dddd');
}

function date(date: string) {
	const d = moment(date);
	return d.format('YYYY-MM-DD');
}

function minPriorities(ps: DailyPriority[]) {
	if (!ps || !ps.length) {
		return new Array(3).fill({
			note: '',
		});
	}
	return ps;
}

export default Week
