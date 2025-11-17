import { Footer } from "../Footer/Footer";
import { MarketingNav } from "../MarketingNav/MarketingNav";
import styles from "./LegalPage.module.css";
import type { JSX } from "react";

export function LegalPage({ children }: LegalPageProps) {
	return (
		<div className={styles["c-legal"]}>
			<MarketingNav />

			<main className={styles["c-legal__main"]}>{children}</main>
			<Footer />
		</div>
	);
}

interface LegalPageProps {
	children: Array<JSX.Element>;
}
