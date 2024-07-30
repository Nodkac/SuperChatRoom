// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEVVbblmNszdaiUoVYmGY05qH57xWZkuk",
  authDomain: "chatroom-9c77d.firebaseapp.com",
  projectId: "chatroom-9c77d",
  storageBucket: "chatroom-9c77d.appspot.com",
  messagingSenderId: "834291958520",
  appId: "1:834291958520:web:35976210392a13df72710d",
  measurementId: "G-TZXF92XKPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)