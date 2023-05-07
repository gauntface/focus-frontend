import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

import styles from "./WeekSelector.module.css";

export function WeekSelector({date}: Props) {
	const lastWeek = moment(date).subtract(1, 'week');
	const nextWeek = moment(date).add(1, 'week');
	return (<div className={styles['c-ws']}>
		<Link className={styles['c-ws__left']} href={`/week/${lastWeek.year()}/${lastWeek.week()}`} aria-label="Previous week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Left arrow" />
		</Link>
		{date.format('MMMM YYYY')} - Week {date.week()}
		<Link className={styles['c-ws__right']} href={`/week/${nextWeek.year()}/${nextWeek.week()}`} aria-label="Next week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Right arrow" />
		</Link>
	</div>);
}

interface Props {
	date: moment.Moment
}
