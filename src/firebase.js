// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCleXuejYXuJSiSaRSVu2h_Y1EysTCTP1k",
  authDomain: "loginandsignup-page.firebaseapp.com",
  projectId: "loginandsignup-page",
  storageBucket: "loginandsignup-page.appspot.com",
  messagingSenderId: "181779132521",
  appId: "1:181779132521:web:ddc4cc2e15e9054efab2f8",
  measurementId: "G-VZ8T56SE6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);