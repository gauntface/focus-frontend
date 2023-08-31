import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import {add, sub, startOfWeek, endOfWeek, parse, getYear, getWeek} from 'date-fns';
import {useEffect, useState} from 'react';
import { DatePriorities, getPrioritiesForDates } from '../../../models/priorities';
import {withAuth} from '../../../utils/withAuth';
import {WeekTasks} from '../../../components/WeekTasks/WeekTasks';
import { useAuth } from '../../../contexts/Auth';
import { WeekSelector } from '../../../components/WeekSelector/WeekSelector';
import { Footer } from '../../../components/Footer/Footer';
import { TaskHeader } from '../../../components/TaskHeader/TaskHeader';
import { QuarterTracker } from "../../../components/QuarterTracker/QuarterTracker";
import { LayoutFullHeight } from "../../../components/LayoutFullHeight/LayoutFullHeight";

const Week: NextPage = () => {
	const {user} = useAuth();
	const router = useRouter();

	const { year, week } = router.query;

	let yearNum: number, weekNum: number;
	if (typeof year !== 'string') {
		yearNum = getYear(new Date());
	} else {
		yearNum = parseInt(year, 10);
	}

	if (typeof week !== 'string') {
		weekNum = getWeek(new Date());
	} else {
		weekNum = parseInt(week, 10);
	}
	const weekStr = weekNum.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false
	});
	const date = parse(`${yearNum} ${weekStr}`, 'YYYY ww', new Date(), {
		useAdditionalWeekYearTokens: true,
	});

	const [datePriorities, setDatePriorities] = useState<Array<DatePriorities>>(getEmptyWeekDetails(date));

	useEffect(() => {
		setDatePriorities(getEmptyWeekDetails(date));

		// TODO: Handle no user correctly.
		if (!user) {
			return;
		}

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
	}, [yearNum, weekNum]);

	// TODO: Handle no user correctly.
	if (!user) {
		return (<div>Please sign in.</div>);
	}

	return (
		<>
			<LayoutFullHeight>
				<TaskHeader user={user} date={date} selectedView="week" />
				<QuarterTracker date={date} />
				<WeekSelector date={date} />
				<main>
					<WeekTasks datePriorities={datePriorities} />
				</main>
				<Footer />
			</LayoutFullHeight>
		</>
	);
};

function getWeekDates(date: Date) {
	const start = add(startOfWeek(date), {days: 1});
	const end = sub(endOfWeek(date), {days: 1});
	return {start, end};
}

function getEmptyWeekDetails(date: Date): Array<DatePriorities> {
	const {start} = getWeekDates(date);
	const week: Array<DatePriorities> = Array(5).fill({});
	for (let i = 0; i < week.length; i++) {
		week[i] = {
			date: add(start, {days: i}),
			priorities: [],
		};
	}
	return week;
}

export default withAuth(Week);
