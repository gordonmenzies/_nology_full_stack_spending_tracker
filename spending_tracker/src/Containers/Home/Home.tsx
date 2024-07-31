import "./Home.scss";
import IncomeBreakdown from "../../Components/Charts/IncomeBreakdown";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { doSignOut } from "../../Components/Context/auth";
import { GlobalContext } from "../../Components/Context/GlobalState";
import { Menu } from "../../Components/Menu/Menu";

import { AddTransactionLite } from "../../Components/Transactions/AddTransactionLite";

interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
}

type User = {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  transactions: Transaction[];
};

const Home = () => {
  const { user } = useContext(GlobalContext);

  return (
    <div className="container">
      <Menu></Menu>
      <p>hello nice to see you again {user.firstName}</p>
      <AddTransactionLite></AddTransactionLite>
      <div>
        <IncomeBreakdown />
      </div>
      <div className="buttons">
        <Link to={"/analytics"} replace={true}>
          <button>Analytics</button>
        </Link>
        <Link to={"/"} replace={true}>
          <button onClick={() => doSignOut()}>Sign Out</button>
        </Link>
      </div>
    </div>
  );
};

// add a payment
// analytics
// settings
// monthly spend graph
// in budget out of budget

export default Home;

// const [data, setData] = useState<User>();
// const [error, setError] = useState<string | null>(null);
// const userId = user ? user.id : "";

// const database = getDatabase(app);

// useEffect(() => {
//   const fetchUserData = async (userId: string) => {
//     try {
//       const userRef = ref(database, "users/" + userId);
//       onValue(userRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(userRef);
//         console.log("User data: ", data);
//         if (data) {
//           setData(data);
//           console.log("data", data);
//         } else {
//           setError("No data found for the specified user ID");
//         }
//       });

//       // Clean up the listener
//       return () => {
//         off(userRef);
//       };
//     } catch (error) {
//       console.error("Error fetching user data: ", error);
//       setError("Error fetching user data");
//     }
//   };

//   if (userId) {
//     fetchUserData(userId);
//   }
// }, [userId]);
