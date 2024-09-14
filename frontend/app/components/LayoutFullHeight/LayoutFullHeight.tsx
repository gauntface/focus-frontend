import styles from "./LayoutFullHeight.module.css";

export function LayoutFullHeight(props: LayoutFullHeightProps) {
	return (
		<div className={styles['l-full-h']}>
			{ props.children }
		</div>);
}

interface LayoutFullHeightProps {
  children: JSX.Element[]|JSX.Element;
}
