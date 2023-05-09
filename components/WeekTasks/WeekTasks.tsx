import { DailyPriority, DatePriorities, getPrioritiesForDates } from '../../models/priorities';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';

import styles from './WeekTasks.module.css';
import moment from 'moment';
import { User } from 'firebase/auth';

export function WeekTasks({date, user}: Props) {
	const [datePriorities, setDatePriorities] = useState<Array<DatePriorities>>(getEmptyWeekDetails(date));

	useEffect(() => {
		setDatePriorities(getEmptyWeekDetails(date));
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
	}, [date]);

	return (
		<div className={styles['c-wt']}>
			<div className={styles['c-wt__wrapper']}>
				<section className={styles['c-wt__week-section']}>
					{datePriorities.map((dps: DatePriorities, idx: number) => {
						const date = moment(dps.date);
						return (
							<div className={styles['c-wt__day-section']} key={idx}>
								<h3><Link href={`/day/${formatDateString(date)}`} key={date.toString()}>{dayOfWeek(date)}<br/><span className={styles['c-wt__dayofmonth']}>{dayOfMonth(date)}</span></Link></h3>
								<ol className={styles['c-wt__tasks']}>
									{dps.priorities.map((priority, idx) => {
										return (<li key={idx} className={styles['c-wt__task-item']}>{priority.note}</li>);
									})}
								</ol>
								{addTasks(date, dps.priorities)}
							</div>
						);
					})}
				</section>
			</div>
		</div>
	);
}

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

function addTasks(date: moment.Moment, priorities: Array<DailyPriority>) {
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

function addTaskButton(date: moment.Moment) {
	return (<div className={styles['c-wt__add-task']} onClick={() => console.log(`TODO: Go to ${date}`)}>
		<Image width="18" height="18" src="/icons/add.svg" alt="Add task icon" />
		Add Task</div>);
}

function dayOfWeek(d: moment.Moment) {
	return d.format('dddd');
}

function dayOfMonth(d: moment.Moment) {
	return d.format('Do');
}

function formatDateString(d: moment.Moment) {
	return d.format('YYYY-MM-DD');
}

interface Props {
	date: moment.Moment;
  user: User;
}
