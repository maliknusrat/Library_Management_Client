// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFfMEYexJXXK3QmUK54KiloQiUnUlx8do",
  authDomain: "librarymanagement-caa8c.firebaseapp.com",
  projectId: "librarymanagement-caa8c",
  storageBucket: "librarymanagement-caa8c.appspot.com",
  messagingSenderId: "975375823649",
  appId: "1:975375823649:web:c41a9292035c2315b28460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;