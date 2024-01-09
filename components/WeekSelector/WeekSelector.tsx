import Link from 'next/link';
import Image from 'next/image';
import {add, sub, format, getWeek, getYear} from 'date-fns';

import styles from "./WeekSelector.module.css";

export function WeekSelector({date}: Props) {
	// When dates cross years, the getWeek() will return the correct week
	// (i.e. week 52 of year 2023 and week 1 of 2024) but getYear, may not
	// return the correct year for the week.
	// For example, Sunday 31st 2023 is week 1 of 2024, so getWeek(<sun 31st>)
	// returns `1` but getYear(<sun 31st>) returns 2023.
	// This naive approach returns the week + year we want
	let prevWeek = getWeek(date) - 1;
	let prevYear = getYear(date);
	if (prevWeek <= 0) {
		const lastWeek = sub(date, {weeks: 1});
		prevWeek = getWeek(lastWeek);
		prevYear = getYear(lastWeek);
	}

	let nextYear = getYear(date);
	let nextWeek = getWeek(date) + 1;
	const nextWeekDate = add(date, {weeks: 1});
	if (getWeek(nextWeekDate) === 1) {
		nextWeek = 1;
		nextYear += 1;
	}
	return (<div className={styles['c-ws']}>
		<Link className={styles['c-ws__left']} href={`/week/${prevYear}/${prevWeek}`} aria-label="Previous week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Left arrow" />
		</Link>
		{format(date, 'MMMM yyyy')} - Week {getWeek(date)}
		<Link className={styles['c-ws__right']} href={`/week/${nextYear}/${nextWeek}`} aria-label="Next week">
			<Image width="8" height="14" src="/icons/arrow.svg" alt="Right arrow" />
		</Link>
	</div>);
}

interface Props {
	date: Date
}
