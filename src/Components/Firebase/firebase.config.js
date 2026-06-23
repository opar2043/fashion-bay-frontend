// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9KTAHzG_hqqsVQF_Hb7JjytgT31aKOlc",
  authDomain: "fir-frist-a7aab.firebaseapp.com",
  projectId: "fir-frist-a7aab",
  storageBucket: "fir-frist-a7aab.firebasestorage.app",
  messagingSenderId: "396851218733",
  appId: "1:396851218733:web:c6bc8b8757101aa88baba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth