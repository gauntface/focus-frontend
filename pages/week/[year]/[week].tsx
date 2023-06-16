import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import moment from 'moment';
import {useEffect, useState} from 'react';
import { DatePriorities, getPrioritiesForDates } from '../../../models/priorities';
import {withAuth} from '../../../utils/withAuth';
import {WeekTasks} from '../../../components/WeekTasks/WeekTasks';
import { useAuth } from '../../../contexts/Auth';
import { WeekSelector } from '../../../components/WeekSelector/WeekSelector';
import { Footer } from '../../../components/Footer/Footer';
import { TaskHeader } from '../../../components/TaskHeader/TaskHeader';
import { QuarterTracker } from "../../../components/QuarterTracker/QuarterTracker";


const Week: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();

	const { year, week } = router.query;

	let yearNum: number, weekNum: number;
	if (typeof year !== 'string') {
		yearNum = moment().year();
	} else {
		yearNum = parseInt(year, 10);
	}

	if (typeof week !== 'string') {
		weekNum = moment().week();
	} else {
		weekNum = parseInt(week, 10);
	}
	const date = moment(`${yearNum}W${weekNum.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false
	})}`);

	const [datePriorities, setDatePriorities] = useState<Array<DatePriorities>>(getEmptyWeekDetails(date));

	useEffect(() => {
		setDatePriorities(getEmptyWeekDetails(date));

		// TODO: Handle no user correctly.
		if (!user) {
			return;
		}

		(async () => {
			try {
				// .startOf() and .endOf() mutate the original object, so you need
				// to make a copy of the date
				const {start, end} = getWeekDates(date);
				const dates = await getPrioritiesForDates(user, start, end);
				setDatePriorities(dates);
			} catch (err) {
				// TODO: Show error / warning to user
				console.error(`Failed to fetch week`);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [yearNum, weekNum]);

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

			<div>
				<TaskHeader user={user} date={date} selectedView="week" />
				<QuarterTracker date={date.toDate()} />
				<WeekSelector date={date} />
				<WeekTasks datePriorities={datePriorities} />
				<Footer />
			</div>
		</div>
	);
};

function getWeekDates(date: moment.Moment) {
	const start = moment(date.startOf('week')).add(1, 'd');
	const end = moment(date.endOf('week')).subtract(1, 'd');
	return {start, end};
}

function getEmptyWeekDetails(date: moment.Moment) {
	const {start} = getWeekDates(date);
	const week = Array(5).fill({});
	for (let i = 0; i < week.length; i++) {
		week[i] = {
			date: moment(start).add(i, 'd'),
			priorities: [],
		};
	}
	return week;
}

export default withAuth(Week);
