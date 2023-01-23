// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXOyPMQnrrinDWSmB-uYwy10UudX5TnLA",
  authDomain: "findwork-db94e.firebaseapp.com",
  projectId: "findwork-db94e",
  storageBucket: "findwork-db94e.appspot.com",
  messagingSenderId: "600129506174",
  appId: "1:600129506174:web:95cc4a74b7d280e414412f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)