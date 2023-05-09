import type { NextPage } from 'next';
import Head from 'next/head';

import moment from 'moment';

import {WeekTasks} from '../../components/WeekTasks/WeekTasks';
import { WeekSelector } from '../../components/WeekSelector/WeekSelector';
import { TaskHeader } from '../../components/TaskHeader/TaskHeader';
import { QuarterTracker } from "../../components/QuarterTracker/QuarterTracker";

const Week: NextPage = () => {
	const user = {
		displayName: `Ruffles Gaunt-Seo`,
	};

	const yearNum = 2006;
	const weekNum = 3;

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
				<WeekTasks datePriorities={demoDatePriorities()} />
			</div>
		</div>
	);
};

function demoDatePriorities() {
	return [
		{
			date: '2006-01-02',
			priorities: [],
		}, {
			date: '2006-01-03',
			priorities: [
				{
					note: 'Meeting with Anne about roadmap for the quarter',
					order: 0,
				}, {
					note: 'Writing proposal for release process for GitHub actions',
					order: 1,
				}, {
					note: 'Bug triage and cleanup',
					order: 2,
				},
			],
		}, {
			date: '2006-01-04',
			priorities: [
				{
					note: 'Team offsite 🎉',
					order: 0,
				}, {
					note: 'Meet with Erin to go through priorities for the team',
					order: 1,
				}
			],
		}, {
			date: '2006-01-05',
			priorities: [
				{
					note: 'Implement auth plugin for deployment service',
					order: 0,
				}, {
					note: 'Feature: Add GitHub repo collaborators to data collection',
					order: 1,
				}, {
					note: 'Start dashboard for GitHub stats',
					order: 2,
				},
			],
		}, {
			date: '2006-01-06',
			priorities: [
				{
					note: 'Finish off GitHub stats dashboard',
					order: 0,
				}, {
					note: 'Explore new CSS features #container-queries-ftw',
					order: 1,
				}, {
					note: 'Record podcast',
					order: 2,
				},
			],
		}
	];
}

export default Week;
