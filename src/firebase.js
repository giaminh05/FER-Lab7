// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtuK4oD3kh2w02KZoQoqifV7bAuMhVlJM",
  authDomain: "films-a01cb.firebaseapp.com",
  projectId: "films-a01cb",
  storageBucket: "films-a01cb.appspot.com",
  messagingSenderId: "430106978742",
  appId: "1:430106978742:web:b6af49a0e80fd161d7f917",
  measurementId: "G-JG8DNN1Y75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
