

import {useState} from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import moment from 'moment';
import { useRouter } from 'next/router';

import {withAuth} from '../../utils/withAuth'
import { useAuth } from '../../contexts/Auth';
import { DefaultLayout } from '../../components/DefaultLayout/DefaultLayout';
import { DayTasks } from '../../components/DayTasks/DayTasks';
import { ViewSelection } from '../../components/TaskHeader/TaskHeader';
import { WeekTasks } from '../../components/WeekTasks/WeekTasks';

// TODO: This is turned gnarly with handling the User | null types.
//       Please tidy up this logic.

const Day: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();
	const dateString = router.query.date;

	const date = moment(dateString);

	const [selectedView, setSelectedView] = useState<ViewSelection>('day');

	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
	}

	let childView;
	switch (selectedView) {
	case 'day':
		childView = (<DayTasks date={date} user={user} />);
		break;
	case 'week':
		childView = (<WeekTasks date={date} user={user} />);
		break;
	}
	return (
		<div>
			<Head>
				<title>Focus</title>
				<meta name="description" content="Focus is a simple tool to help you plan and focus on your work" />
				<link rel="icon" href={'/favicon.ico' } />
			</Head>

			<DefaultLayout selectedView={selectedView} user={user} date={date} title={date.format('ddd, Do MMMM')} onViewChange={(view) => setSelectedView(view)}>
				{childView}
			</DefaultLayout>
		</div>
	)
}

export default withAuth(Day)
