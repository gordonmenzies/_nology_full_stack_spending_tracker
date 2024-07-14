import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Auth/Login/Login";
import AddSpend from "./Containers/AddSpend/AddSpend";
import Analytics from "./Containers/Analytics/Analytics";
import Register from "./Components/Register/Register";
import SignIn from "./Components/SignIn/SignIn";

import "./App.css";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

type User = {
  id: string;
  name: string;
  password: string;
  email: string;
};

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
// const firestore = getFirestore(app);
// const auth = getAuth(app);

const App = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const standardCollection = collection(firestore, "standard");
  //       const standardQuery = query(standardCollection);
  //       const querySnapshot = await getDocs(standardQuery);
  //       const fetchedData: User[] = [];
  //       querySnapshot.forEach((doc) => {
  //         fetchedData.push({ id: doc.id, ...doc.data() } as User);
  //       });
  //       setData(fetchedData);
  //     } catch (error: any) {
  //       setError("Error fetching data: " + error.message);
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addspend" element={<AddSpend />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Register></Register>
      <SignIn></SignIn>
      {error && <p>{error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
