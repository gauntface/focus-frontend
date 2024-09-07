import styles from "./MarketingSplitSection.module.css";

export function MarketingSplitSection({ children }: MarketingSplitSectionProps) {
	return (
		<section className={styles['c-mkt-split__wrapper']}>
			<div className={styles['c-mkt-split']}>
				{children[0]}
				{children[1]}
			</div>
		</section>);
}

interface MarketingSplitSectionProps {
  children: JSX.Element[];
}
