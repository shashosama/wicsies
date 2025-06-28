// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//  1. Your Firebase config (fill in your actual keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// 2. Initialize Firebase App
const app = initializeApp(firebaseConfig);

//  3. Set up Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

//  4. Sign in anonymously (AFTER auth is initialized)
signInAnonymously(auth).catch((err) => {
  console.error("Anonymous sign-in failed:", err);
});
