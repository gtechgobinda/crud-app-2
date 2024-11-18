import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0U_6g_rOk7k9ziq96mLEW5gVsvLUC9LM",
  authDomain: "crud-app-2-23bca.firebaseapp.com",
  projectId: "crud-app-2-23bca",
  storageBucket: "crud-app-2-23bca.firebasestorage.app",
  messagingSenderId: "265039249327",
  appId: "1:265039249327:web:9ed669c54699e75138795a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
