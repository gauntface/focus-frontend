import {
	GoogleAuthProvider,
	getAdditionalUserInfo,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	type User,
	type UserCredential
} from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';
import { writable, type Writable } from 'svelte/store';

export const userStore: Writable<User | null> = writable(null);

class Auth {
	private _isPerformingAction: boolean = true;
	public readonly ready: Promise<void> = new Promise((resolve) => {
		const dispose = onAuthStateChanged(firebaseAuth, () => {
			dispose();
			resolve();
		});
	});

	constructor() {
		onAuthStateChanged(firebaseAuth, (user) => {
			this._isPerformingAction = false;
			userStore.set(user);
		});
	}

	get isPerformingAction() {
		return this._isPerformingAction;
	}

	async signIn() {
		if (this._isPerformingAction) {
			console.warn('Already signing in.');
			return;
		}

		this._isPerformingAction = true;
		try {
			const result = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
			this.checkNewUser(result);
		} catch (err) {
			console.warn('Failed to sign in user: ', err);
		} finally {
			this._isPerformingAction = false;
		}
	}

	async signOut() {
		if (this._isPerformingAction) {
			console.warn('Already signing out.');
			return;
		}

		this._isPerformingAction = true;
		try {
			await signOut(firebaseAuth);
		} catch (err) {
			console.warn('Failed to sign out user: ', err);
		} finally {
			this._isPerformingAction = false;
		}
	}

	private async checkNewUser(uc: UserCredential) {
		if (!uc) {
			console.warn('No user credentials given.');
			return;
		}

		if (!window.beampipe) {
			console.warn('Unable to report user metrics to beampipe.');
			return;
		}

		const aui = getAdditionalUserInfo(uc);
		if (aui?.isNewUser) {
			window.beampipe('new-user');
		}
	}
}

export const auth = new Auth();
