import React from "react";
import styles from "./NotesArea.module.css";

export function NotesArea(props: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!props.onChange) {
			console.log('No on Change');
			return;
		}

		props.onChange(e.target.value);
	}

	return (
		<div data-replicated-value={props.note} className={styles['c-notesarea']}>
			<textarea disabled={props.disabled} name={`${props.name}-text`} onChange={(e) => handleChange(e)}  rows={props.rows} value={props.note} className={styles['c-notesarea__textarea']}></textarea>
		</div>
	);
}

interface Props {
  note: string;
  name: string;
  disabled: boolean;
  rows: number;
  onChange: (s: string) => void;
}