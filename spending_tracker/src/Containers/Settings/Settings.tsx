import "./Settings.scss";
import IncomeBreakdown from "../../Components/Charts/IncomeBreakdown";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { doSignOut } from "../../Components/Context/auth";
import { GlobalContext } from "../../Components/Context/GlobalState";
import { Menu } from "../../Components/Menu/Menu";

const Settings = () => {
  const { user, updateCategory } = useContext(GlobalContext);
  const [addCategory, setAddCategory] = useState("");

  return (
    <div className="container">
      <Menu></Menu>
      <p>hello nice to see you again {user.firstName}</p>
      <input className="input-lite" type="text" value={addCategory} onChange={(e) => setAddCategory(e.target.value)} placeholder="add Category" />
      <button onClick={() => updateCategory(addCategory)}>add Category</button>
      <div>
        <IncomeBreakdown />
      </div>
      <div className="buttons">
        <Link to={"/Settings"} replace={true}>
          <button>Settings</button>
        </Link>
        <Link to={"/"} replace={true}>
          <button onClick={() => doSignOut()}>Sign Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
