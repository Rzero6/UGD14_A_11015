// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCU-xq2GDBdfMJJRhwTozH02ZFr-7_gko",
  authDomain: "pw-firebase-11015.firebaseapp.com",
  projectId: "pw-firebase-11015",
  storageBucket: "pw-firebase-11015.appspot.com",
  messagingSenderId: "778329862475",
  appId: "1:778329862475:web:96975c289c6140b8c578ce",
  databaseURL: "https://pw-firebase-11015-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signInProvider = new GoogleAuthProvider();
signInProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const auth = getAuth(app);
export default app;

export const db = getDatabase(app);
export const DB_CHAT_KEY = 'chats';