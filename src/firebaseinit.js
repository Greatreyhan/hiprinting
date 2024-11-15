// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyAX_L6pvx0sLVzRMvDGo7b9OkP6nWGua14",
  authDomain: "hiprintingid.firebaseapp.com",
  databaseURL: "https://hiprintingid-default-rtdb.firebaseio.com",
  projectId: "hiprintingid",
  storageBucket: "hiprintingid.firebasestorage.app",
  messagingSenderId: "483625916572",
  appId: "1:483625916572:web:b35972c59e3dc79a7af559",
  measurementId: "G-VP141W58LC"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORE = getStorage(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);