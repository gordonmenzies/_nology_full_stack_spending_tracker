import "./Home.scss";
import IncomeBreakdown from "../../Components/Charts/IncomeBreakdown";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { doSignOut } from "../../Components/Context/auth";
import { GlobalContext } from "../../Components/Context/GlobalState";
import { Menu } from "../../Components/Menu/Menu";

import { AddTransactionLite } from "../../Components/Transactions/AddTransactionLite";

const Home = () => {
  const { firstName } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await doSignOut(); // Wait for sign-out to complete
    navigate("/", { replace: true }); // Navigate after sign-out
  };

  return (
    <div className="container">
      <Menu></Menu>
      <p>hello nice to see you again {firstName}</p>
      <AddTransactionLite></AddTransactionLite>
      <div>
        <IncomeBreakdown />
      </div>
      <div className="buttons">
        <Link to={"/Settings"} replace={true}>
          <button>Settings</button>
        </Link>
        <Link to={"/"} replace={true}>
          <button onClick={() => handleSignOut()}>Sign Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
