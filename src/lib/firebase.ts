import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDXZZyh6RvIfJX7HTJnfONVuHWI6V2tjgQ",
    authDomain: "socialscale-dashboard.firebaseapp.com",
    projectId: "socialscale-dashboard",
    storageBucket: "socialscale-dashboard.firebasestorage.app",
    messagingSenderId: "143806360842",
    appId: "1:143806360842:web:98e3aea49909a31497def3",
    measurementId: "G-JSHMDEZZR4"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
