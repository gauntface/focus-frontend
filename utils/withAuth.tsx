import { NextComponentType } from "next";
import {useAuth} from "../contexts/Auth";
import { useRouter } from 'next/router';

export function withAuth<P extends object>(Component: NextComponentType<P>) {
	const Auth = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		if (loading) {
			return (<div>
				<p>Loading...</p>
			</div>);
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
