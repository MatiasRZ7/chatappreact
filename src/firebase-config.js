// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Z5QGFAZvYJR9kqTkm7n_WFm6GgoPjZo",
  authDomain: "chatappreact-f8eee.firebaseapp.com",
  projectId: "chatappreact-f8eee",
  storageBucket: "chatappreact-f8eee.appspot.com",
  messagingSenderId: "321964991929",
  appId: "1:321964991929:web:e5a278163d27ed09ec4268"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);