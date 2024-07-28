import "./Home.scss";
import IncomeBreakdown from "../../Components/Charts/IncomeBreakdown";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { doSignOut } from "../../Components/Context/auth";
import { app } from "../../Config/config";
import { useAuth } from "../../Components/Context/AuthenticationState";
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
  name: string;
  password: string;
  email: string;
  transactions: Transaction[];
};

const Home = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const userId = currentUser ? currentUser.uid : "";

  const database = getDatabase(app);

  const signOut = () => {};

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      try {
        const userRef = ref(database, "users/" + userId);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          console.log(userRef);
          console.log("User data: ", data);
          if (data) {
            setData(data);
          } else {
            setError("No data found for the specified user ID");
          }
        });

        // Clean up the listener
        return () => {
          off(userRef);
        };
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setError("Error fetching user data");
      }
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  return (
    <div className="container">
      <Menu></Menu>
      <p>hello nice to see you again {currentUser?.email}</p>
      <AddTransactionLite></AddTransactionLite>
      <div>
        <IncomeBreakdown />
      </div>
      <div className="buttons">
        <Link to={"/addspend"} replace={true}>
          <button>See Transactions</button>
        </Link>
        <Link to={"/analytics"} replace={true}>
          <button>Analytics</button>
        </Link>
        <button onClick={() => doSignOut()}>Sign Out</button>
      </div>
      {/* <p>{budget}</p>
      <SimpleTransactionBlock></SimpleTransactionBlock>
      <Statistic></Statistic> */}
    </div>
  );
};

// add a payment
// analytics
// settings
// monthly spend graph
// in budget out of budget

export default Home;
