import { DailyPriority, DatePriorities } from '../../models/priorities';
import { Link } from "@remix-run/react";

import styles from './WeekTasks.module.css';
import {format} from 'date-fns';

export function WeekTasks({datePriorities}: Props) {
	console.log();
	return (
		<div className={styles['c-wt__wrapper']}>
			<div id="c-wt" className={styles['c-wt']}>
				<section className={styles['c-wt__week-section']}>
					{datePriorities.map((dps: DatePriorities, idx: number) => {
						const date = dps.date;
						return (
							<div className={styles['c-wt__day-section']} key={idx}>
								<h3><Link to={`/day/${format(date, 'yyyy-MM-dd')}`} key={date.toString()}>{format(date, 'EEEE')}<br/><span className={styles['c-wt__dayofmonth']}>{format(date, 'do')}</span></Link></h3>
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

function addTasks(date: Date, priorities: Array<DailyPriority>) {
	if (priorities.length == 3) {
		return (<></>);
	}

	if (priorities.length == 0) {
		return (<div className={styles['c-wt__no-tasks']}>
			<div>
				You have no tasks for {format(date, 'EEEE')}
			</div>
			{addTaskButton(date)}
		</div>);
	}
	return (<div className={styles['c-wt__missing_tasks']}>
		{addTaskButton(date)}
	</div>);
}

function addTaskButton(date: Date) {
	return (<Link className={styles['c-wt__add-task']} to={`/day/${format(date, 'yyyy-MM-dd')}`}>
		<img width="18" height="18" src="/icons/add.svg" alt="Add task icon" />
		Add Task</Link>);
}

interface Props {
	datePriorities: Array<DatePriorities>;
}
