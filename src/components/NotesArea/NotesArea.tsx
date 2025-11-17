import React from "react";
import styles from "./NotesArea.module.css";
import type {JSX} from "react";

const widths = [100, 60, 80, 70, 75, 60, 45, 40, 50, 90, 80, 90];

export function NotesArea(props: NotesAreaProps) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		props.onChange(e.target.value);
	};

	if (props.loading) {
		const skeleton: Array<JSX.Element> = [];
		for (let i = 0; i < props.rows; i++) {
			const inlineStyles = { width: `${widths[i % widths.length]}%` };
			skeleton.push(
				<div
					key={`row-${i}`}
					className={`${styles["c-notesarea--skeleton"]}`}
					style={inlineStyles}
				></div>,
			);
		}
		return <div className={styles["c-notesarea"]}>{skeleton}</div>;
	}

	return (
		<div className={styles["c-notesarea"]}>
			<div
				data-replicated-value={props.note}
				className={styles["c-notesarea__growing-textarea"]}
			>
				<textarea
					name={`${props.name}-text`}
					onChange={handleChange}
					rows={props.rows}
					value={props.note}
					className={styles["c-notesarea__textarea"]}
					disabled={props.loading}
				></textarea>
			</div>
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
