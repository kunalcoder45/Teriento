// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1NPchD4nwBv09JJ9a0Mf5GDMhMV9__1o",
  authDomain: "teriento.firebaseapp.com",
  projectId: "teriento",
  storageBucket: "teriento.firebaseapp.com",
  messagingSenderId: "956625193039",
  appId: "1:956625193039:web:6fe783f9777486c3adc23a",
  measurementId: "G-2FJJ94NR2C",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export { auth, googleProvider, signInWithPopup };
