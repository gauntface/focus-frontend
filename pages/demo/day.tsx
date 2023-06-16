import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';

import { TaskHeader } from '../../components/TaskHeader/TaskHeader';
import { DayTasks } from '../../components/DayTasks/DayTasks';
import { QuarterTracker } from "../../components/QuarterTracker/QuarterTracker";

const Day: NextPage = () => {
	const date = moment('2006-01-02');

	const user = {
		displayName: `Ruffles Gaunt-Seo`,
	};

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
				<DayTasks priorities={demoPriorities()} notes={demoNotes()} onNotesChange={onNotesChange} onDailyPriorityChange={onDailyPriorityChange} loading={false} />
			</div>
		</div>
	);
};

function demoPriorities() {
	return [
		{
			note: 'Prepare presentation for team leads meeting',
			order: 0,
		}, {
			note: 'Review proposal for new service architecture',
			order: 1,
		}, {
			note: 'Make progress on deployment pipeline',
			order: 2,
		}
	];
}

function demoNotes() {
	return `Met with Dave to discuss next offsite.

Fixed a small issue in our Slack app - we hit a point where pagination is needed.`;
}

function onNotesChange() {
	// NOOP
}

function onDailyPriorityChange() {
	// NOOP
}

export default Day;
