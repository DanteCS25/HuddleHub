// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuawzmL2SSsgvggknbcmFXYbZIepHeuwI",
  authDomain: "huddlehub-3bf7d.firebaseapp.com",
  projectId: "huddlehub-3bf7d",
  storageBucket: "huddlehub-3bf7d.appspot.com",
  messagingSenderId: "356464535690",
  appId: "1:356464535690:web:51eb2719109d6c1c9ca573",
  measurementId: "G-FNJCWPDP53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)