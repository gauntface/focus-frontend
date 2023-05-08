import { DailyPriority, DatePriorities, getPrioritiesForDates } from '../../models/priorities';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';

import styles from './WeekTasks.module.css';
import moment from 'moment';
import { User } from 'firebase/auth';

export function WeekTasks({date, user}: Props) {
	const start = moment(date.startOf('week')).add(1, 'd');
	const end = moment(date.endOf('week')).subtract(1, 'd');
	const week = Array(5).fill({});
	for (let i = 0; i < week.length; i++) {
		week[i] = {
			date: moment(start).add(i, 'd'),
			priorities: [],
		};
	}

	const [datePriorities, setDatePriorities] = useState<Array<DatePriorities>>(week);

	useEffect(() => {
		(async () => {
			// .startOf() and .endOf() mutate the original object, so you need
			// to make a copy of the date
			const dates = await getPrioritiesForDates(user, start, end);
			setDatePriorities(dates);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	return (
		<div className={styles['c-wt']}>
			<section className={styles['c-wt__week-section']}>
				{datePriorities.map((dps: DatePriorities, idx: number) => {
					return (
						<div className={styles['c-wt__day-section']} key={idx}>
							<h3><Link href={`/day/${formatDateString(dps.date)}`} key={dps.date.toString()}>{dayOfWeek(dps.date)}</Link></h3>
							<ol className={styles['c-wt__tasks']}>
								{dps.priorities.map((priority, idx) => {
									return (<li key={idx} className={styles['c-wt__task-item']}>{priority.note}</li>);
								})}
							</ol>
							{addTasks(dps.date, dps.priorities)}
						</div>
					);
				})}
			</section>
		</div>
	);
}

function addTasks(date: string, priorities: Array<DailyPriority>) {
	if (priorities.length == 3) {
		return (<></>);
	}

	if (priorities.length == 0) {
		return (<div className={styles['c-wt__no-tasks']}>
			<div>
				You have no tasks for {dayOfWeek(date)}
			</div>
			{addTaskButton(date)}
		</div>);
	}
	return (<div className={styles['c-wt__missing_tasks']}>
		{addTaskButton(date)}
	</div>);
}

function addTaskButton(date: string) {
	return (<div className={styles['c-wt__add-task']} onClick={() => console.log(`TODO: Go to ${date}`)}>
		<Image width="18" height="18" src="/icons/add.svg" alt="Add task icon" />
		Add Task</div>);
}

function dayOfWeek(date: string) {
	const d = moment(date);
	return d.format('dddd');
}

function formatDateString(date: string) {
	const d = moment(date);
	return d.format('YYYY-MM-DD');
}

interface Props {
	date: moment.Moment;
  user: User;
}
