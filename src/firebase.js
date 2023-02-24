
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "admindashboard-a21c2.firebaseapp.com",
    projectId: "admindashboard-a21c2",
    storageBucket: "admindashboard-a21c2.appspot.com",
    messagingSenderId: "913143593428",
    appId: "1:913143593428:web:f53bc1f53e03e6d1fc7e41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
