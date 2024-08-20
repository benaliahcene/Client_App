import { FirebaseOptions, initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDNpvdlGj08OTZvNEb4n_78djTcGkZf4HA",
  authDomain: "junction-cc5ca.firebaseapp.com",
  projectId: "junction-cc5ca",
  storageBucket: "junction-cc5ca.appspot.com",
  messagingSenderId: "829463991201",
  appId: "1:829463991201:web:569fff154cf307954771e0",
  measurementId: "G-QWF90RKBF2",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

//firestore
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

//auth

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// const auth = getAuth(app);

export { app, db, auth };
