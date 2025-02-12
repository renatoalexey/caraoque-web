// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqvinaZfOJXwc2J5KfPgbuuzaIDXUfRDY",
    authDomain: "caraoque-716e3.firebaseapp.com",
    projectId: "caraoque-716e3",
    storageBucket: "caraoque-716e3.firebasestorage.app",
    messagingSenderId: "536029755363",
    appId: "1:536029755363:web:687f149474baf59bba92d6",
    measurementId: "G-WJ8BV3TKGP"
};

// Initialize Firebase (avoid multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
