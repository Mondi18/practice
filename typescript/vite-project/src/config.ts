import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAOZ17Pwn3_NkFDOfsyXpc3DlakLktCilQ",
  authDomain: "zebrataxi-db.firebaseapp.com",
  databaseURL: "https://zebrataxi-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zebrataxi-db",
  storageBucket: "zebrataxi-db.appspot.com",
  messagingSenderId: "311601858842",
  appId: "1:311601858842:web:920842c547f75bef3544a3",
  measurementId: "G-FFB9ZZ92FN"
};

// Check if Firebase app is already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
export const realtimeDb = getDatabase(app);
