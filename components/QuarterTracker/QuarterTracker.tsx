import styles from './QuarterTracker.module.css';

import moment from 'moment';

export function QuarterTracker(props: Props) {
	const d = props.date;
	const progress = progressDetails(d);
	const progressStyles = {
		width: `${progress.percentage}%`,
	};
	return (
		<div className={styles['c-qt']}>
			<div>Progress in Q{d.quarter()} &apos;{d.format('YY')}</div>
			<div>{progress.currentWeek + 1} of {progress.weeksInQuarter}</div>
			<div className={styles['c-qt__bar']}>
				<div className={styles['c-qt__prog']} style={progressStyles}></div>
			</div>
		</div>
	)
}

function progressDetails(dayViewed: moment.Moment) {
	const start = moment().quarter(dayViewed.quarter()).startOf('quarter');
	const end = moment().quarter(dayViewed.quarter()).endOf('quarter');
	const weeks = end.diff(start, 'weeks');
	const currentWeek = dayViewed.diff(start, 'weeks');
	return {
		percentage: Math.round((currentWeek / weeks) * 100),
		weeksInQuarter: weeks,
		currentWeek,
	}
}

interface Props {
  date: moment.Moment;
}
