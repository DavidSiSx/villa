// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHyCHLbizQZzSB5LOLP3UQJfbWmv-AJhU",
  authDomain: "login-villa-9da2d.firebaseapp.com",
  projectId: "login-villa-9da2d",
  storageBucket: "login-villa-9da2d.firebasestorage.app",
  messagingSenderId: "817645371496",
  appId: "1:817645371496:web:f90dc39bf65e785e7ffbdd",
  measurementId: "G-6KTGN1XXZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Exporta Auth y Firestore
export const auth = getAuth(app);
export const db   = getFirestore(app);

// Esto es opcional si quieres usar Analytics en la web
