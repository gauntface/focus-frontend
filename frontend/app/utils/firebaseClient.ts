import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
	projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
	appId: process.env.PUBLIC_FIREBASE_APP_ID,
	authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
