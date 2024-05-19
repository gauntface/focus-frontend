import {parseISO} from 'date-fns';


import { DailyPriority, getDailyPriorities, setDailyPriorities } from "../../models/priorities";
import {getDailyNotes, setDailyNotes} from "../../models/notes";
import { DayTasks } from '../../components/DayTasks/DayTasks';
import { DelayAPI } from '../../utils/useDelayedState';


const SAVE_TIMEOUT_MS = 2000;

const tasksDelay = new DelayAPI(SAVE_TIMEOUT_MS, 'DatePageSaveTasks', {
	pending: 'Saving tasks...',
	success: {
		render: 'Tasks saved',
		autoClose: 1200,
	},
	error: 'Failed to save tasks'
});
const notesDelay = new DelayAPI(SAVE_TIMEOUT_MS, 'DatePageSaveNotes', {
	pending: 'Saving notes...',
	success: {
		render: 'Notes saved',
		autoClose: 1200,
	},
	error: 'Failed to save notes',
});

const Day: NextPage = () => {
	const {user} = useAuth();
	const {query, isReady} = useRouter();

	const [loading, setLoading] = useState<boolean>(true);
	const [priorities, setPriorities] = useState<Array<DailyPriority>>(getEmptyPriorities());
	const [notes, setNotes] = useState<string>('');

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
			setNotes('');

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
				<main>
					<DayTasks priorities={priorities} notes={notes} loading={loading} onNotesChange={onNotesChange} onDailyPriorityChange={onDailyPriorityChange} />
				</main>
		</>
	);
};

function getEmptyPriorities() {
	return [
		{
			note: '',
			order: 0,
		}, {
			note: '',
			order: 0,
		}, {
			note: '',
			order: 0,
		}
	];
}

export default withAuth(Day);
