import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDm-Bj5eqXjpnBf7LSE18Iulf9Z4XxPXn4",
  authDomain: "ecomercereactt.firebaseapp.com",
  projectId: "ecomercereactt",
  storageBucket: "ecomercereactt.firebasestorage.app",
  messagingSenderId: "819929641884",
  appId: "1:819929641884:web:6a3e0128b4af4a0b394e59"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)