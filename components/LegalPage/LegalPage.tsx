import Footer from '../Footer/Footer';
import MarketingNav from '../MarketingNav/MarketingNav';
import styles from "./LegalPage.module.css";

export default function LegalPage({ children }: LegalPageProps) {
	return (
		<div className={styles['c-legal']}>
			<MarketingNav />

			<main className={styles['c-legal__main']}>
				{ children }
			</main>
			<Footer />
		</div>);
}

interface LegalPageProps {
  children: JSX.Element[];
}
