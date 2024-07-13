import { Route, Routes } from "react-router-dom";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import AddSpend from "./Containers/AddSpend/AddSpend";
import Analytics from "./Containers/Analytics/Analytics";
import "./App.css";

function App() {
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
}

export default App;
