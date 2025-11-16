import type { NextPage } from "next";
import { parseISO } from "date-fns";

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import {
	DailyPriority,
	getDailyPriorities,
	setDailyPriorities,
} from "../../../src/models/priorities";
import { getDailyNotes, setDailyNotes } from "../../../src/models/notes";
import { withAuth } from "../../../src/utils/withAuth";
import { useAuth } from "../../contexts/Auth";
import { Footer } from "../../components/Footer/Footer";
import { TaskHeader } from "../../components/TaskHeader/TaskHeader";
import { DayTasks } from "../../components/DayTasks/DayTasks";
import { QuarterTracker } from "../../components/QuarterTracker/QuarterTracker";
import { LayoutFullHeight } from "../../components/LayoutFullHeight/LayoutFullHeight";
import { DelayAPI } from "../../../src/utils/useDelayedState";

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

const Day: NextPage = () => {
	const { user } = useAuth();
	const { query, isReady } = useRouter();

	const [loading, setLoading] = useState<boolean>(true);
	const [priorities, setPriorities] =
		useState<Array<DailyPriority>>(getEmptyPriorities());
	const [notes, setNotes] = useState<string>("");

	const dateString = query.date as string;
	const dateRef = useRef(dateString);

	useEffect(() => {
		if (!isReady) {
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
	}, [dateString, isReady]);

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
};

function getEmptyPriorities() {
	return [
		{ note: "", order: 0 },
		{ note: "", order: 0 },
		{ note: "", order: 0 },
	];
}

export default withAuth(Day);
