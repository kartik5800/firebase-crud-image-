import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjUea-nQkn-dzvAlF_XbRwymmUL2PtPag",
  authDomain: "react-firebase-crud-908c6.firebaseapp.com",
  projectId: "react-firebase-crud-908c6",
  storageBucket: "react-firebase-crud-908c6.appspot.com",
  messagingSenderId: "878602629724",
  appId: "1:878602629724:web:83c36ea7fe273de796ac99",
  measurementId: "G-C17M9X6YPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);