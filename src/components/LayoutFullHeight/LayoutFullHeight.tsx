import styles from "./LayoutFullHeight.module.css";

import type { JSX } from "react";

export function LayoutFullHeight(props: LayoutFullHeightProps) {
	return <div className={styles["l-full-h"]}>{props.children}</div>;
}

interface LayoutFullHeightProps {
	children: Array<JSX.Element> | JSX.Element;
}
