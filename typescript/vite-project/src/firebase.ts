// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore();
