import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';
import { useRouter } from 'next/router';

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

	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
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
				<DayTasks date={date} user={user} />
				<Footer />
			</div>
		</div>
	);
};

export default withAuth(Day);
