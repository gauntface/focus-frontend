import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import moment from 'moment';

import {WeekTasks} from '../../../components/WeekTasks/WeekTasks';
import { useAuth } from '../../../contexts/Auth';
import { DefaultLayout } from '../../../components/DefaultLayout/DefaultLayout';

const Week: NextPage = () => {
	const {user} = useAuth();
	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
	}

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

	return (
		<div>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<DefaultLayout user={user} date={d} title={`Week ${week}, ${year}`} subtitle={`${d.startOf('week').format('Do MMMM')} - ${d.endOf('week').format('Do MMMM')}`} selectedView='week' onViewChange={(view) => console.error(`TODO: Add View Change to Week page: ${view}`)}>
				<WeekTasks date={d} user={user} />
			</DefaultLayout>
		</div>
	);
}

export default Week
