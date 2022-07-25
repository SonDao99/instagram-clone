// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXYOyiZZ0nDqZBJC0buNOLjZqziubcXyQ",
  authDomain: "instagram-clone-igc.firebaseapp.com",
  projectId: "instagram-clone-igc",
  storageBucket: "instagram-clone-igc.appspot.com",
  messagingSenderId: "176323343796",
  appId: "1:176323343796:web:a491619a29092b6bfeeee1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//Database:
export const db = getFirestore(app);

//Storage:
export const storage = getStorage(app);