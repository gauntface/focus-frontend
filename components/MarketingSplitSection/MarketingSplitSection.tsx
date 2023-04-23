import styles from "./MarketingSplitSection.module.css";

export function MarketingSplitSection({ children }: MarketingSplitSectionProps) {
	return (
		<section className={styles['c-mkt-split']}>
			<div>
				{children[0]}
				{children[1]}
			</div>
		</section>);
}

interface MarketingSplitSectionProps {
  children: JSX.Element[];
}
