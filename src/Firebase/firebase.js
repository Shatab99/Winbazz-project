import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIfQTovCE-WW2-m1mh8F3NjlZ06_veXqo",
    authDomain: "winbaz88-users.firebaseapp.com",
    projectId: "winbaz88-users",
    storageBucket: "winbaz88-users.appspot.com",
    messagingSenderId: "84970861948",
    appId: "1:84970861948:web:048df79cce4e3c751ba0f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)