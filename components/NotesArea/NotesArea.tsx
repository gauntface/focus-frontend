import React from "react";
import styles from "./NotesArea.module.css";

export function NotesArea(props: NotesAreaProps) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		props.onChange(e.target.value);
	};

	let skeleton: JSX.Element|undefined;
	if (props.loading) {
		skeleton =(
			<div className={`${styles['c-notesarea--skeleton']}`}></div>
		);
	}

	return (
		<div data-replicated-value={props.note} className={styles['c-notesarea']}>
			<textarea name={`${props.name}-text`} onChange={(e) => handleChange(e)}  rows={props.rows} value={props.note} className={styles['c-notesarea__textarea']} disabled={props.loading}></textarea>
			{skeleton}
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
