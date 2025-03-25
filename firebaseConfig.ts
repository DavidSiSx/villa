// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCbT_ntHovmrXHMEQG3BW1moFqDmqKGaU",
  authDomain: "login-19a66.firebaseapp.com",
  projectId: "login-19a66",
  storageBucket: "login-19a66.firebasestorage.app",
  messagingSenderId: "149027443508",
  appId: "1:149027443508:web:1afbdad45d1014dbc10b61",
  measurementId: "G-98EFFGCQ2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)