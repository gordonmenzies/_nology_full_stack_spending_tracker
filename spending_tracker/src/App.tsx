import { useState } from "react";
import { AuthProvider } from "./Components/Context/AuthenticationState";
import { Route, Routes } from "react-router-dom";

import { config } from "./Config/config";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Auth/Login/Login";
import Analytics from "./Containers/Analytics/Analytics";
import AddSpend from "./Containers/AddSpend/AddSpend";

import "./App.css";

import { initializeApp } from "firebase/app";
import "firebase/database";

type User = {
  id: string;
  name: string;
  password: string;
  email: string;
};

const app = initializeApp(config.firebase);

const App = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addspend" element={<AddSpend />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </AuthProvider>

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
