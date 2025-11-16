import styles from "./Footer.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton } from '../SignInButton/SignInButton';
import { canPromptForInstall, performInstall } from "../../controllers/app-banner";
import { useState } from "react";

export function Footer() {
	const [promptForInstall, setPromptForInstall] = useState(canPromptForInstall());

	const onInstallClick = async () => {
		await performInstall();
		setPromptForInstall(canPromptForInstall());
	};

	return (
		<footer className={styles['c-footer']}>
			<p><Link href="/"><Image width="180" height="100" src="/logo/full-logo-white.svg" alt="Focus logo in white" /></Link></p>
			<div className={styles['c-footer__content']}>
				<div>
					<h5>Useful Links</h5>
					<ul>
						<li><Link href="/">Home</Link></li>
						<li><Link href="/#about">About Focus</Link></li>
						{promptForInstall && (
							<li><a onClick={() => onInstallClick()}>Install App</a></li>
						)}
						<li><Link href="https://www.buymeacoffee.com/gauntface" target="_blank">Support this Project</Link></li>
						<li><Link href="https://app.beampipe.io/domain/focus.gaunt.dev" target="_blank">Analytics</Link></li>
						<li><SignInButton classModifier="highlight" /></li>
					</ul>
				</div>

				<div>
					<h5>Policy</h5>
					<ul>
						<li><Link href="/privacy">Privacy Policy</Link></li>
						<li><Link href="/cookies">Cookies</Link></li>
					</ul>
				</div>

				<div>
					<h5>Get in Touch</h5>
					<ul>
						<li><Link href="https://github.com/gauntface/focus-frontend/issues/new" target="_blank">Found a bug?</Link></li>
						<li><Link href="mailto:focus@gaunt.dev">E-mail</Link></li>
						<li><Link href="https://mastodon.gaunt.dev/@matt" target="_blank">Mastodon</Link></li>
					</ul>
				</div>
			</div>

			<p>© All rights reserved {new Date().getFullYear()}</p>
		</footer>);
}
