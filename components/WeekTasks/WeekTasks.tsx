import { DailyPriority, DatePriorities } from '../../models/priorities';
import Link from 'next/link';
import Image from 'next/image';

import styles from './WeekTasks.module.css';
import moment from 'moment';

export function WeekTasks({datePriorities}: Props) {
	return (
		<div className={styles['c-wt__wrapper']}>
			<div id="c-wt" className={styles['c-wt']}>
				<section className={styles['c-wt__week-section']}>
					{datePriorities.map((dps: DatePriorities, idx: number) => {
						const date = moment(dps.date);
						return (
							<div className={styles['c-wt__day-section']} key={idx}>
								<h3><Link href={`/day/${date.format('YYYY-MM-DD')}`} key={date.toString()}>{date.format('dddd')}<br/><span className={styles['c-wt__dayofmonth']}>{date.format('Do')}</span></Link></h3>
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

function addTasks(date: moment.Moment, priorities: Array<DailyPriority>) {
	if (priorities.length == 3) {
		return (<></>);
	}

	if (priorities.length == 0) {
		return (<div className={styles['c-wt__no-tasks']}>
			<div>
				You have no tasks for {date.format('dddd')}
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

interface Props {
	datePriorities: Array<DatePriorities>;
}
