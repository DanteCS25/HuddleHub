// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import getReactNativePersistence
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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

// Use initializeAuth instead of getAuth if you need custom behavior
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app)
// when we export a variable/function, it is accessable in other files

import { AppRegistry } from 'react-native';
import App from './App'; // Adjust the path according to your project structure
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
