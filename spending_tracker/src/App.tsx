import { Route, Routes } from "react-router-dom";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import AddSpend from "./Containers/AddSpend/AddSpend";
import Analytics from "./Containers/Analytics/Analytics";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZzJFtpB1asMpp6ZFow-1D52ucP-jsEH4",
  authDomain: "spending-tracker-584a8.firebaseapp.com",
  projectId: "spending-tracker-584a8",
  storageBucket: "spending-tracker-584a8.appspot.com",
  messagingSenderId: "351908282910",
  appId: "1:351908282910:web:cb9b93634596da6d7de40f",
  measurementId: "G-5S0XFW511L",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// import { collection, addDoc } from "firebase/firestore";

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/addspend" element={<AddSpend />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
      </Routes>
      <p>hello</p>
    </div>
  );
};

export default App;
