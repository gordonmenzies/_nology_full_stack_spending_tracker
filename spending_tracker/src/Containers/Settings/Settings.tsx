import "./Settings.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { doSignOut } from "../../Components/Context/auth";
import { GlobalContext } from "../../Components/Context/GlobalState";
import { Menu } from "../../Components/Menu/Menu";
import { CategoryComp } from "./CategoryComp";

const Settings = () => {
  const { user, updateCategory, categoryList } = useContext(GlobalContext);
  const [addCategory, setAddCategory] = useState("");

  return (
    <div className="container">
      <Menu></Menu>
      <p>hello nice to see you again {user.firstName}</p>
      <div className="updateCategory">
        <input className="input-lite" type="text" value={addCategory} onChange={(e) => setAddCategory(e.target.value)} placeholder="Category" />
        <button onClick={() => updateCategory(addCategory)}>Add</button>
      </div>
      <>
        <h3>Categories</h3>
        <ul className="list">
          {categoryList.map((category, index) => (
            <CategoryComp key={index} category={category} index={index} />
          ))}
        </ul>
      </>
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
