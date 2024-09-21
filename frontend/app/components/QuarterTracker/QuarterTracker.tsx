import styles from './QuarterTracker.module.css';

import {getQuarter, startOfQuarter, endOfQuarter, differenceInCalendarWeeks, format} from 'date-fns';

export function QuarterTracker(props: Props) {
	const d = props.date;
	const progress = progressDetails(d);
	const progressStyles = {
		width: `${progress.percentage}%`,
	};
	return (
		<div className={styles['c-qt']}>
			<div>Progress in Q{getQuarter(d)} &apos;{format(d, 'yy')}</div>
			<div>{progress.currentWeek + 1} of {progress.weeksInQuarter}</div>
			<div className={styles['c-qt__bar']}>
				<div className={styles['c-qt__prog']} style={progressStyles}></div>
			</div>
		</div>
	);
}

function progressDetails(dayViewed: Date) {
	const start = startOfQuarter(dayViewed);
	const end = endOfQuarter(dayViewed);
	const weeks = differenceInCalendarWeeks(end, start);
	const currentWeek = differenceInCalendarWeeks(dayViewed, start);
	return {
		percentage: Math.round((currentWeek / weeks) * 100),
		weeksInQuarter: weeks,
		currentWeek,
	};
}

interface Props {
  date: Date;
}
