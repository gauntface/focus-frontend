import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
	projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
	appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
	authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
