import type { NextPage } from 'next';

import { TaskHeader } from '../../old/components/TaskHeader/TaskHeader';
import { DayTasks } from '../../old/components/DayTasks/DayTasks';
import { QuarterTracker } from "../../old/components/QuarterTracker/QuarterTracker";

const Day: NextPage = () => {
	const date = new Date(2006, 0, 2);

	const user = {
		displayName: `Ruffles Gaunt-Seo`,
	};

	return (
		<>
			<TaskHeader user={user} date={date} selectedView="day" />
			<QuarterTracker date={date} />
			<DayTasks priorities={demoPriorities()} notes={demoNotes()} onNotesChange={onNotesChange} onDailyPriorityChange={onDailyPriorityChange} loading={false} />
		</>
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
