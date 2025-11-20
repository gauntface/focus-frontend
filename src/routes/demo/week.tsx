import { createFileRoute } from "@tanstack/react-router";
import { parse } from "date-fns";
import { QuarterTracker } from "@/components/QuarterTracker/QuarterTracker";
import { TaskHeader } from "@/components/TaskHeader/TaskHeader";
import { WeekSelector } from "@/components/WeekSelector/WeekSelector";
import { WeekTasks } from "@/components/WeekTasks/WeekTasks";

export const Route = createFileRoute("/demo/week")({ component: WeekDemo });

function WeekDemo() {
	const user = { displayName: `Ruffles Gaunt-Seo` };

	const yearNum = 2006;
	const weekNum = 3;
	const weekStr = weekNum.toLocaleString("en-US", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	const d = parse(`${yearNum} ${weekStr}`, "YYYY ww", new Date(), {
		useAdditionalWeekYearTokens: true,
	});

	return (
		<>
			<TaskHeader user={user} date={d} selectedView="week" />
			<QuarterTracker date={d} />
			<WeekSelector date={d} />
			<WeekTasks datePriorities={demoDatePriorities()} />
		</>
	);
}

function demoDatePriorities() {
	return [
		{ date: new Date(2006, 0, 2), priorities: [] },
		{
			date: new Date(2006, 0, 3),
			priorities: [
				{ note: "Meeting with Anne about roadmap for the quarter", order: 0 },
				{
					note: "Writing proposal for release process for GitHub actions",
					order: 1,
				},
				{ note: "Bug triage and cleanup", order: 2 },
			],
		},
		{
			date: new Date(2006, 0, 4),
			priorities: [
				{ note: "Team offsite 🎉", order: 0 },
				{
					note: "Meet with Erin to go through priorities for the team",
					order: 1,
				},
			],
		},
		{
			date: new Date(2006, 0, 5),
			priorities: [
				{ note: "Implement auth plugin for deployment service", order: 0 },
				{
					note: "Feature: Add GitHub repo collaborators to data collection",
					order: 1,
				},
				{ note: "Start dashboard for GitHub stats", order: 2 },
			],
		},
		{
			date: new Date(2006, 0, 6),
			priorities: [
				{ note: "Finish off GitHub stats dashboard", order: 0 },
				{ note: "Explore new CSS features #container-queries-ftw", order: 1 },
				{ note: "Record podcast", order: 2 },
			],
		},
	];
}
