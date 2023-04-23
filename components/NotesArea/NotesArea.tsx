import React from "react";
import styles from "./NotesArea.module.css";

export function NotesArea(props: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!props.onChange) {
			return;
		}

		props.onChange(e.target.value);
	}

	return (
		<div data-replicated-value={props.note} className={[styles['c-notesarea'], styles['c-notesarea__grow-wrap']].join(' ')}>
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