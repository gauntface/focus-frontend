import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	add,
	endOfWeek,
	getWeek,
	getYear,
	parse,
	startOfWeek,
	sub,
} from "date-fns";
import { useEffect, useState } from "react";
import type { DatePriorities } from "@/models/priorities";
import { Footer } from "@/components/Footer/Footer";
import { LayoutFullHeight } from "@/components/LayoutFullHeight/LayoutFullHeight";
import { QuarterTracker } from "@/components/QuarterTracker/QuarterTracker";
import { TaskHeader } from "@/components/TaskHeader/TaskHeader";
import { WeekSelector } from "@/components/WeekSelector/WeekSelector";
import { WeekTasks } from "@/components/WeekTasks/WeekTasks";
import { useAuth } from "@/contexts/Auth";
import { getPrioritiesForDates } from "@/models/priorities";
import { wrapWithAuthWaiting } from "@/utils/wrapWithAuthWaiting";

export const Route = createFileRoute("/week/$year/$week")({
	component: wrapWithAuthWaiting(Week),
});

function Week() {
	const { user } = useAuth();

	const { year, week } = Route.useParams();

	let yearNum: number, weekNum: number;
	if (typeof year !== "string") {
		yearNum = getYear(new Date());
	} else {
		yearNum = parseInt(year, 10);
	}

	if (typeof week !== "string") {
		weekNum = getWeek(new Date());
	} else {
		weekNum = parseInt(week, 10);
	}
	const weekStr = weekNum.toLocaleString("en-US", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});
	const date = parse(`${yearNum} ${weekStr}`, "YYYY ww", new Date(), {
		useAdditionalWeekYearTokens: true,
	});

	const [datePriorities, setDatePriorities] = useState<Array<DatePriorities>>(
		getEmptyWeekDetails(date),
	);

	useEffect(() => {
		setDatePriorities(getEmptyWeekDetails(date));

		if (!user) {
			return;
		}

		(async () => {
			try {
				// .startOf() and .endOf() mutate the original object, so you need
				// to make a copy of the date
				const { start, end } = getWeekDates(date);
				const dates = await getPrioritiesForDates(user, start, end);
				setDatePriorities(dates);
			} catch (err) {
				// TODO: Show error / warning to user
				console.error(`Failed to fetch week`);
			}
		})();
	}, [yearNum, weekNum]);

	if (!user) {
		return <div>Please sign in.</div>;
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
}

function getWeekDates(date: Date) {
	const start = add(startOfWeek(date), { days: 1 });
	const end = sub(endOfWeek(date), { days: 1 });
	return { start, end };
}

function getEmptyWeekDetails(date: Date): Array<DatePriorities> {
	const { start } = getWeekDates(date);
	const week: Array<DatePriorities> = Array(5).fill({});
	for (let i = 0; i < week.length; i++) {
		week[i] = { date: add(start, { days: i }), priorities: [] };
	}
	return week;
}
