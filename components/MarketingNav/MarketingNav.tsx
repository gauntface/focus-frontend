import { useAuth } from '../../contexts/Auth';
import styles from "./MarketingNav.module.css";
import { SignInButton } from '../SignInButton/SignInButton';

import Image from 'next/image';
import Link from 'next/link';

export function MarketingNav() {
	const {user} = useAuth();
	let taskBtn;
	let modifer;
	if (user && user.email) {
		taskBtn = (
			<Link href="/home"><button>Tasks</button></Link>
		);
		modifer = 'subtle';
	}

	return (
		<section className={styles['c-mkt-nav']}>
			<Link href="/"><Image width="48" height="48" src="/mini-logo.svg" alt="Small Focus Logo" /></Link>

			<div className={styles['c-mkt-nav__menu']}>
				<SignInButton classModifier={modifer} />
				{taskBtn}
			</div>
		</section>);
}
