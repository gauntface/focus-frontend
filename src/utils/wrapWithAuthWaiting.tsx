import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../contexts/Auth";
import { LayoutFullHeight } from "../components/LayoutFullHeight/LayoutFullHeight";
import { Loading } from "../components/Loading/Loading";

import styles from "../styles/layouts/l-auth.module.css";

export function wrapWithAuthWaiting<TProps extends Record<string, any> = {}>(
	Component: (props: TProps) => any,
): (props: TProps) => any {
	function Auth(props: TProps) {
		const { user, loading } = useAuth();
		const router = useRouter();

		if (loading) {
			return (
				<LayoutFullHeight>
					<main className={styles["l-auth__loading"]}>
						<Loading />
					</main>
				</LayoutFullHeight>
			);
		}

		if (!user) {
			router.navigate({ to: "/" });
			return null;
		}

		return <Component {...props} />;
	}

	Auth.displayName = `withAuth(${Component.name || "Component"})`;

	return Auth;
}
