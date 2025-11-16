import { NextComponentType } from "next";
import {useAuth} from "../old/contexts/Auth";
import { useRouter } from 'next/router';
import { LayoutFullHeight } from "../old/components/LayoutFullHeight/LayoutFullHeight";
import { Loading } from "../old/components/Loading/Loading";

import styles from "../styles/layouts/l-auth.module.css";

export function withAuth<P extends object>(Component: NextComponentType<P>) {
	const Auth = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		if (loading) {
			return (<LayoutFullHeight>
				<main className={styles['l-auth__loading']}>
					<Loading />
				</main>
			</LayoutFullHeight>);
		}

		if (!user) {
			router.push("/");
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
