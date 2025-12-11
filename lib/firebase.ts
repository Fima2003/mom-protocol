// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhXYMmHAX6YVj_O2FiebTLvug61QdeU1I",
  authDomain: "gen-lang-client-0783951303.firebaseapp.com",
  projectId: "gen-lang-client-0783951303",
  storageBucket: "gen-lang-client-0783951303.firebasestorage.app",
  messagingSenderId: "768806664656",
  appId: "1:768806664656:web:ade93af07af7519ab3a1d5",
  measurementId: "G-8TXTHG7725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};