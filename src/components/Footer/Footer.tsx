import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SignInButton } from "../SignInButton/SignInButton";
import {
	canPromptForInstall,
	performInstall,
} from "../../controllers/app-banner";
import styles from "./Footer.module.css";

export function Footer() {
	const [promptForInstall, setPromptForInstall] = useState(
		canPromptForInstall(),
	);

	const onInstallClick = async () => {
		await performInstall();
		setPromptForInstall(canPromptForInstall());
	};

	return (
		<footer className={styles["c-footer"]}>
			<p>
				<Link to="/">
					<img
						width="180"
						height="100"
						src="/logo/full-logo-white.svg"
						alt="Focus logo in white"
					/>
				</Link>
			</p>
			<div className={styles["c-footer__content"]}>
				<div>
					<h5>Useful Links</h5>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<a href="/#about">About Focus</a>
						</li>
						{promptForInstall && (
							<li>
								<a onClick={() => onInstallClick()}>Install App</a>
							</li>
						)}
						<li>
							<a href="https://www.buymeacoffee.com/gauntface" target="_blank">
								Support this Project
							</a>
						</li>
						<li>
							<a
								href="https://app.beampipe.io/domain/focus.gaunt.dev"
								target="_blank"
							>
								Analytics
							</a>
						</li>
						<li>
							<SignInButton classModifier="highlight" />
						</li>
					</ul>
				</div>

				<div>
					<h5>Policy</h5>
					<ul>
						<li>
							<Link to="/privacy">Privacy Policy</Link>
						</li>
						<li>
							<Link to="/cookies">Cookies</Link>
						</li>
					</ul>
				</div>

				<div>
					<h5>Get in Touch</h5>
					<ul>
						<li>
							<a
								href="https://github.com/gauntface/focus-frontend/issues/new"
								target="_blank"
							>
								Found a bug?
							</a>
						</li>
						<li>
							<a href="mailto:focus@gaunt.dev">E-mail</a>
						</li>
						<li>
							<a href="https://mastodon.gaunt.dev/@matt" target="_blank">
								Mastodon
							</a>
						</li>
					</ul>
				</div>
			</div>

			<p>© All rights reserved {new Date().getFullYear()}</p>
		</footer>
	);
}
