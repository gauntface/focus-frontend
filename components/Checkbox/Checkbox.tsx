import styles from "./Checkbox.module.css";

export function Checkbox(props: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!props.onChange) {
			console.log('No on Change');
			return;
		}

		console.log(`Change => `, e);
		props.onChange(e.target.checked)
	}
	console.log(props);
	return (
		<div>
			<input type="checkbox" className={styles['c-checkbox']} checked={props.checked} onChange={(e) => handleChange(e)} />
		</div>
	);
}

interface Props {
    checked: boolean;
    onChange: (c: boolean) => void;
  }