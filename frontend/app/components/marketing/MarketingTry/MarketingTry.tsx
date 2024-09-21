import styles from "./MarketingTry.module.css";
import { SignInButton } from '~/components/SignInButton/SignInButton';

export function MarketingTry() {
	return (
		<section className={styles['c-mkt-try']}>
			<h2>Ready to start using Focus?</h2>

			<p>Sign in below and you&apos;ll be good to go!</p>
			<p><SignInButton classModifier="highlight" signInText="Get Started" /></p>
		</section>);
}
