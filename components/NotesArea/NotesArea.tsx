import React from "react";
import styles from "./NotesArea.module.css";

export function NotesArea(props: NotesAreaProps) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		props.onChange(e.target.value);
	};

	if (props.loading) {
		return (
			<div data-replicated-value={props.note} className={styles['c-notesarea']}>
				<textarea disabled={true} rows={props.rows} className={styles['c-notesarea__textarea']}></textarea>
				<div className={`${styles['c-notesarea--skeleton']}`}></div>
			</div>
		);
	}

	return (
		<div data-replicated-value={props.note} className={styles['c-notesarea']}>
			<textarea name={`${props.name}-text`} onChange={(e) => handleChange(e)}  rows={props.rows} value={props.note} className={styles['c-notesarea__textarea']}></textarea>
		</div>
	);
}

interface NotesAreaProps {
  note: string;
  name: string;
	loading?: boolean;
  rows: number;
  onChange: (s: string) => void;
}
