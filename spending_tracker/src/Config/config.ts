import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";

const config = {
  firebase: {
    apiKey: "AIzaSyBZzJFtpB1asMpp6ZFow-1D52ucP-jsEH4",
    authDomain: "spending-tracker-584a8.firebaseapp.com",
    projectId: "spending-tracker-584a8",
    storageBucket: "spending-tracker-584a8.appspot.com",
    messagingSenderId: "351908282910",
    appId: "1:351908282910:web:cb9b93634596da6d7de40f",
    measurementId: "G-5S0XFW511L",
  },
};

const app = initializeApp(config.firebase);
const auth = getAuth(app);

export { app, auth, config };
