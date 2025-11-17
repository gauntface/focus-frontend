import { DayTasks } from "@/components/DayTasks/DayTasks";
import { Footer } from "@/components/Footer/Footer";
import { LayoutFullHeight } from "@/components/LayoutFullHeight/LayoutFullHeight";
import { QuarterTracker } from "@/components/QuarterTracker/QuarterTracker";
import { TaskHeader } from "@/components/TaskHeader/TaskHeader";
import { useAuth } from "@/contexts/Auth";
import { getDailyNotes, setDailyNotes } from "@/models/notes";
import {
	getDailyPriorities,
	setDailyPriorities,
	type DailyPriority,
} from "@/models/priorities";
import { DelayAPI } from "@/utils/useDelayedState";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/day/$date")({ component: Day });

const SAVE_TIMEOUT_MS = 2000;

const tasksDelay = new DelayAPI(SAVE_TIMEOUT_MS, "DatePageSaveTasks", {
	pending: "Saving tasks...",
	success: { render: "Tasks saved", autoClose: 1200 },
	error: "Failed to save tasks",
});
const notesDelay = new DelayAPI(SAVE_TIMEOUT_MS, "DatePageSaveNotes", {
	pending: "Saving notes...",
	success: { render: "Notes saved", autoClose: 1200 },
	error: "Failed to save notes",
});

export function Day() {
	const userAuth = useAuth();
	const user = userAuth.user;
	const userAuthLoading = userAuth.loading;
	const params = useParams({ strict: false });
	const dateString = params["date"] as string | undefined;

	const [loading, setLoading] = useState<boolean>(true);
	const [priorities, setPriorities] =
		useState<Array<DailyPriority>>(getEmptyPriorities());
	const [notes, setNotes] = useState<string>("");

	const dateRef = useRef(dateString);

	useEffect(() => {
		if (userAuthLoading) {
			return;
		}

		dateRef.current = dateString;
		setLoading(true);

		(async () => {
			setPriorities(getEmptyPriorities());
			setNotes("");

			let date = new Date();
			if (dateString) {
				date = parseISO(dateString);
			}

			const [ps, ns] = await Promise.all([
				getDailyPriorities(user, date),
				getDailyNotes(user, date),
			]);

			if (dateRef.current != dateString) {
				return;
			}

			setPriorities(ps);
			setNotes(ns);
			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateString, userAuth]);

	let date = new Date();
	if (dateString) {
		date = parseISO(dateString);
	}

	function onDailyPriorityChange(idx: number, e: string) {
		const ps = [...priorities];
		ps[idx].note = e;
		setPriorities(ps);

		tasksDelay.queue(async () => {
			await setDailyPriorities(user, date, ps);
		});
	}

	function onNotesChange(e: string) {
		setNotes(e);

		notesDelay.queue(async () => {
			await setDailyNotes(user, date, e);
		});
	}

	return (
		<>
			<LayoutFullHeight>
				<TaskHeader user={user} date={date} selectedView="day" />
				<QuarterTracker date={date} />
				<main>
					<DayTasks
						priorities={priorities}
						notes={notes}
						loading={loading}
						onNotesChange={onNotesChange}
						onDailyPriorityChange={onDailyPriorityChange}
					/>
				</main>
				<Footer />
			</LayoutFullHeight>
		</>
	);
}

function getEmptyPriorities() {
	return [
		{ note: "", order: 0 },
		{ note: "", order: 0 },
		{ note: "", order: 0 },
	];
}
