// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBP_J7ZMICcVm2977QFPtUFYYBDBe9ApjM",
  authDomain: "e-waste-22842.firebaseapp.com",
  projectId: "e-waste-22842",
  storageBucket: "e-waste-22842.appspot.com",
  messagingSenderId: "1068202605144",
  appId: "1:1068202605144:web:586d76add8e7926f6ae82d"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app);