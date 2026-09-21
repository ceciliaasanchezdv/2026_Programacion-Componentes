import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCpHPBynIk3tBMwovU0Y0_TxmuAMgNtZvE",
  authDomain: "examen-final-tienda.firebaseapp.com",
  projectId: "examen-final-tienda",
  storageBucket: "examen-final-tienda.firebasestorage.app",
  messagingSenderId: "1055555106334",
  appId: "1:1055555106334:web:6b920be7cad4ce9860200f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };