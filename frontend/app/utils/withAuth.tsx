import { NextComponentType } from "next";
import {useAuth} from "../contexts/Auth";
import { LayoutFullHeight } from "~/components/LayoutFullHeight/LayoutFullHeight";
import { Loading } from "~/components/Loading/Loading";
import { useNavigate } from "@remix-run/react"

import styles from "~/styles/layouts/l-auth.module.css";

export function withAuth<P extends object>(Component: NextComponentType<P>) {
	const Auth = (props: P) => {
		const { user, loading } = useAuth();
		const navigate = useNavigate();

		if (loading) {
			return (<LayoutFullHeight>
				<main className={styles['l-auth__loading']}>
					<Loading />
				</main>
			</LayoutFullHeight>);
		}

		if (!user) {
			navigate("/");
			return;
		}

		return (
			<Component {...props as P} />
		);
	};

	// Copy getInitial props so it will run as well
	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}

	return Auth;
}
