import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";

const Firebase = firebase.initializeApp(config.firebase);

export default Firebase;
