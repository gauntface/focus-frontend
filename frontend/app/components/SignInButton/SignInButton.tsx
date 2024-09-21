import { useAuth } from '~/contexts/Auth';
import { GoogleAuthProvider } from "firebase/auth";

export function SignInButton({classModifier, signInText = 'Sign In', redirect = "/home"}: SignInButtonProps) {
	const classList = [];
	if (classModifier) {
		classList.push(`button--${classModifier}`);
	}

	const {signIn, signOut, user} = useAuth();
	if (user && user.email) {
		return (
			<button className={classList.join(' ')} onClick={() => signOut()}>Sign Out</button>
		);
	}

	return (
		<button className={classList.join(' ')} onClick={() => signIn(new GoogleAuthProvider(), redirect)}>{signInText}</button>
	);
}

interface SignInButtonProps {
  classModifier?: string;
  signInText?: string;
  redirect?: string;
}
