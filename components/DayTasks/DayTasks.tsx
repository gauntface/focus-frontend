import styles from './DayTasks.module.css';
import { NotesArea } from '../../components/NotesArea/NotesArea';
import { DailyPriority } from "../../models/priorities";

export function DayTasks({priorities, notes, loading, onNotesChange, onDailyPriorityChange}: Props) {
	return (
		<div className={styles['c-dt__wrapper']}>
			<div id="c-dt" className={styles['c-dt']}>
				<section className={styles['c-dt__tasks-section']}>
					<h3>Tasks</h3>
					<ol className={styles['c-dt__tasks-list']}>
						{priorities.map((priority: DailyPriority, idx: number) => {
							return (<li key={idx} className={styles['c-dt__task']}>
								<NotesArea name={`priority-${idx}`} note={priority.note} onChange={(s: string) => onDailyPriorityChange(idx, s)} rows={1} loading={loading} />
							</li>);
						})}
					</ol>
				</section>

				<section className={styles['c-dt__notes-section']}>
					<h3>Notes</h3>
					<div className={styles['c-dt__notes']}>
						<NotesArea name={`notes`} note={notes}  onChange={onNotesChange} rows={3} loading={loading} />
					</div>
				</section>
			</div>
		</div>
	);
}

interface Props {
	priorities: Array<DailyPriority>;
	notes: string;
	loading: boolean;
	onNotesChange: (s: string) => void;
	onDailyPriorityChange: (idx: number, s: string) => void;
}
