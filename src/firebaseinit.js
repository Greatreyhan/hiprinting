// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyAJY0JmN6fWe3JsFPRXKWHmt6Vzcx6oUvw",
  authDomain: "repayomandiri.firebaseapp.com",
  databaseURL: "https://repayomandiri-default-rtdb.firebaseio.com",
  projectId: "repayomandiri",
  storageBucket: "repayomandiri.appspot.com",
  messagingSenderId: "682762134492",
  appId: "1:682762134492:web:c893cc24f829dcfbcb6519",
  measurementId: "G-4WSGFXHF6X"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORE = getStorage(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);