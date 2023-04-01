import styles from './QuarterTracker.module.css';

import moment from 'moment';
import Link from 'next/link';

export default function QuarterTracker(props: Props) {
	const d = props.date;
	if (!d) {
		return <div></div>
	}
	return (
		<div className={styles['l-qt__weeks']}>
			<span className={styles['l-qt__weeks--nums']}>{weeksInQuarter(d)}</span>
		</div>
	)
}

function weeksInQuarter(dayViewed: moment.Moment) {
	const now = moment();
	const start = moment().quarter(dayViewed.quarter()).startOf('quarter');
	const end = moment().quarter(dayViewed.quarter()).endOf('quarter');
	const weeks = end.diff(start, 'weeks');
	const currentWeek = now.diff(start, 'weeks');
	const weeksInQuarter = weeks;
	const ws = [];
	for (let i = 0; i < weeksInQuarter; i++) {
		const d = moment(start).add(i, 'weeks');
		const w = weekInQuarter(d, i, currentWeek);
		ws.push(w);
	}
	return ws
}

function weekInQuarter(d: moment.Moment, i: number, currentWeek: number) {
	const classes = [styles['c-qt__week']];
	if (i === currentWeek) {
		classes.push(styles['c-qt__week--current']);
	} else if(i > currentWeek) {
		classes.push(styles['c-qt__week--future']);
		return (
			<span className={classes.join(" ")} key={i.toString()}>{i+1}</span>
		)
	}
	return (
		<Link
			href={`/week/${d.year()}/${d.week()}`}
			key={i.toString()}
			className={classes.join(" ")}>{i+1}</Link>
	);
}

interface Props {
  date: moment.Moment;
}
