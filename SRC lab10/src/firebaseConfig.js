import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDydSOvGM2H5m6KZn8rrdogWZUV0v4WzqY",
  authDomain: "lab09-64420.firebaseapp.com",
  projectId: "lab09-64420",
  storageBucket: "lab09-64420.appspot.com",
  messagingSenderId: "1049619327731",
  appId: "1:1049619327731:web:53cfe39e209c17df49a586",
  measurementId: "G-7QMCH5P9ZG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const storage = getFirestore(app);

export { auth };
