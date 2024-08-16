// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-HnTXuJWFbPfQOnFNWY6-NxCXs--6z_w",
  authDomain: "aventados-8f120.firebaseapp.com",
  projectId: "aventados-8f120",
  storageBucket: "aventados-8f120.appspot.com",
  messagingSenderId: "371934772916",
  appId: "1:371934772916:web:d737374c755855214f61e1",
  measurementId: "G-ESMF0Z84ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
