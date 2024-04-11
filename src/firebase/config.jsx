// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq4WxukwMCHYbefe4A7m_fN0RtBcL_WgA",
  authDomain: "eye-spy-vitejs-ff812.firebaseapp.com",
  projectId: "eye-spy-vitejs-ff812",
  storageBucket: "eye-spy-vitejs-ff812.appspot.com",
  messagingSenderId: "575878148008",
  appId: "1:575878148008:web:e7527c245ba045f96ff79d",
  measurementId: "G-GSD0Z526F8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app);
