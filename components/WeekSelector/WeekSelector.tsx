import Link from 'next/link';
import Image from 'next/image';
import {add, sub, format, getWeek, getYear} from 'date-fns';

import styles from "./WeekSelector.module.css";

export function WeekSelector({date}: Props) {
	const lastWeek = sub(date, {weeks: 1});
	const nextWeek = add(date, {weeks: 1});
	return (<div className={styles['c-ws']}>
		<Link className={styles['c-ws__left']} href={`/week/${getYear(lastWeek)}/${getWeek(lastWeek)}`} aria-label="Previous week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Left arrow" />
		</Link>
		{format(date, 'MMMM yyyy')} - Week {getWeek(date)}
		<Link className={styles['c-ws__right']} href={`/week/${getYear(nextWeek)}/${getWeek(nextWeek)}`} aria-label="Next week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Right arrow" />
		</Link>
	</div>);
}

interface Props {
	date: Date
}
