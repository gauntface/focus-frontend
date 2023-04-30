import {auth} from '../utils/firebaseClient';
import { signInWithPopup, signOut, onAuthStateChanged, User, AuthProvider, getAdditionalUserInfo, UserCredential } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext<AuthProviderProps>({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	signIn: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	signOut: () => {},
	user: null,
	loading: false,
})

export function useAuth() {
	return useContext(AuthContext);
}

async function checkNewUser(uc: UserCredential) {
	if (!uc) {
		console.warn('No user credentials given.');
		return;
	}

	if (!window.beampipe) {
		console.warn('Unable to report user metrics to beampipe.');
		return;
	}

	window.beampipe('user-signin');

	const aui = getAdditionalUserInfo(uc);
	if (aui?.isNewUser) {
		window.beampipe('new-user');
	}
}

export function FocusAuthProvider({ children }: {children: React.ReactNode; }) {
	const [user, setUser] = useState<User|null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter();

	useEffect(() => {
		// Listen for changes on auth state (logged in, signed out, etc.)
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			setLoading(false)
		});

		return unsubscribe;
	}, [])

	const value: AuthProviderProps = {
		signIn: async (provider, url) => {
			setLoading(true)
			try {
				const result = await signInWithPopup(auth, provider);
				checkNewUser(result);
				if (url) {
					router.push(url)
				}
			} catch (err) {
				console.log('Failed to sign in user: ', err);
			} finally {
				setLoading(false);
			}
		},
		signOut: async (url) => {
			await signOut(auth);
			router.push(url ? url : "/");
		},
		user,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export interface AuthProviderProps {
  signIn: (provider: AuthProvider, url?: string) => void;
  signOut: (url?: string) => void;
  user: User | null;
  loading: boolean;
}
