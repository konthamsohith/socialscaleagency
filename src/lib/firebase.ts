import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if all required Firebase config is present
const hasFirebaseConfig = Object.values(firebaseConfig).every(value => value && value.trim() !== '');

let app;
let auth: any;
let db: any;

if (hasFirebaseConfig) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        auth = null;
        db = null;
    }
} else {
    console.warn("Firebase config not found, skipping initialization");
    auth = null;
    db = null;
}

const googleProvider = hasFirebaseConfig ? new GoogleAuthProvider() : null;

export { auth, db, googleProvider };
