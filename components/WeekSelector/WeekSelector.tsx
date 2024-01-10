import Link from 'next/link';
import Image from 'next/image';
import {add, sub, format, getWeek, getWeekYear} from 'date-fns';

import styles from "./WeekSelector.module.css";

export function WeekSelector({date}: Props) {
	const prevWeek = sub(date, {weeks: 1});
	const nextWeek = add(date, {weeks: 1});

	return (<div className={styles['c-ws']}>
		<Link className={styles['c-ws__left']} href={`/week/${getWeekYear(prevWeek)}/${getWeek(prevWeek)}`} aria-label="Previous week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Left arrow" />
		</Link>
		{format(nextWeek, 'MMMM yyyy')} - Week {getWeek(date)}
		<Link className={styles['c-ws__right']} href={`/week/${getWeekYear(nextWeek)}/${getWeek(nextWeek)}`} aria-label="Next week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Right arrow" />
		</Link>
	</div>);
}

interface Props {
	date: Date
}
