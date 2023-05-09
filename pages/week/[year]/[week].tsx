import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import moment from 'moment';

import {WeekTasks} from '../../../components/WeekTasks/WeekTasks';
import { useAuth } from '../../../contexts/Auth';
import { WeekSelector } from '../../../components/WeekSelector/WeekSelector';
import { Footer } from '../../../components/Footer/Footer';
import { TaskHeader } from '../../../components/TaskHeader/TaskHeader';
import { QuarterTracker } from "../../../components/QuarterTracker/QuarterTracker";

const Week: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();

	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
	}

	const { year, week } = router.query;

	let yearNum, weekNum;
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

			<div>
				<TaskHeader user={user} date={d} selectedView="week" />
				<QuarterTracker date={d} />
				<WeekSelector date={d} />
				<WeekTasks date={d} user={user} />
				<Footer />
			</div>
		</div>
	);
};

export default Week;
