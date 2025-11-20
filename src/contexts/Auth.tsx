import { useRouter } from "@tanstack/react-router";
import {
	getAdditionalUserInfo,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebaseClient";
import type { AuthProvider, User, UserCredential } from "firebase/auth";

const AuthContext = createContext<AuthProviderProps>({
	signIn: () => {},

	signOut: () => {},
	user: null,
	loading: false,
});

export function useAuth() {
	return useContext(AuthContext);
}

function checkNewUser(uc: UserCredential) {
	if (!window.beampipe) {
		console.warn("Unable to report user metrics to beampipe.");
		return;
	}

	const aui = getAdditionalUserInfo(uc);
	if (aui?.isNewUser) {
		window.beampipe("new-user");
	}
}

export function FocusAuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Listen for changes on auth state (logged in, signed out, etc.)
		const unsubscribe = onAuthStateChanged(auth, (newUserDetails) => {
			setUser(newUserDetails);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value: AuthProviderProps = {
		signIn: async (provider, url) => {
			setLoading(true);
			try {
				const result = await signInWithPopup(auth, provider);
				checkNewUser(result);
				if (url) {
					router.navigate({ to: url });
				}
			} catch (err) {
				console.log("Failed to sign in user: ", err);
			} finally {
				setLoading(false);
			}
		},
		signOut: async (url) => {
			await signOut(auth);
			router.navigate({ to: url ? url : "/" });
		},
		user,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export interface AuthProviderProps {
	signIn: (provider: AuthProvider, url?: string) => void;
	signOut: (url?: string) => void;
	user: User | null;
	loading: boolean;
}
