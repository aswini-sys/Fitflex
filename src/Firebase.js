// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2tNOPBB4T3Pd9Wss76nrT-dIKb9c2rJM",
  authDomain: "fitness-tracker-adbbe.firebaseapp.com",
  projectId: "fitness-tracker-adbbe",
  storageBucket: "fitness-tracker-adbbe.firebasestorage.app",
  messagingSenderId: "224613469515",
  appId: "1:224613469515:web:01f9bb2bfa15161fed2cce",
  measurementId: "G-F0V5EMF10B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
