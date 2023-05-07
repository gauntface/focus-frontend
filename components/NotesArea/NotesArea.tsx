import React from "react";
import styles from "./NotesArea.module.css";

export function NotesArea(props: NotesAreaProps) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		props.onChange(e.target.value);
	};

	return (
		<div data-replicated-value={props.note} className={styles['c-notesarea']}>
			<textarea disabled={props.disabled} name={`${props.name}-text`} onChange={(e) => handleChange(e)}  rows={props.rows} value={props.note} className={styles['c-notesarea__textarea']}></textarea>
		</div>
	);
}

interface NotesAreaProps {
  note: string;
  name: string;
  disabled: boolean;
  rows: number;
  onChange: (s: string) => void;
}