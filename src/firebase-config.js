import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
const firebaseConfig = {
   apiKey: "AIzaSyBlVyIIVnMidKzrXkLmYUC_HBJCMEE5BtY",
  authDomain: "edtech-prototype-1058c.firebaseapp.com",
  projectId: "edtech-prototype-1058c",
  storageBucket: "edtech-prototype-1058c.firebasestorage.app",
  messagingSenderId: "583937555367",
  appId: "1:583937555367:web:acd95c78e83e2b235cd482",
  measurementId: "G-JQQCRS8DYQ"
  };

  const app = initializeApp(firebaseConfig)

  export const db= getFirestore(app);