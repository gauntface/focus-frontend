import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';
import { useRouter } from 'next/router';

import {withAuth} from '../../utils/withAuth';
import { useAuth } from '../../contexts/Auth';
import { DefaultLayout } from '../../components/DefaultLayout/DefaultLayout';
import { DayTasks } from '../../components/DayTasks/DayTasks';

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

			<DefaultLayout selectedView="day" user={user} date={date} title={date.format('ddd, Do MMMM')}>
				<DayTasks date={date} user={user} />
			</DefaultLayout>
		</div>
	);
};

export default withAuth(Day);
