import styles from "./MarketingHero.module.css";

export default function MarketingHero() {
	return (
		<section className={styles['c-mkt-hero']}>
			<div className={styles['c-mkt-hero__content']}>
				<div>Discipline,<br />Productivity<br />F<span>o</span>cus.</div>
			</div>
		</section>);
}
