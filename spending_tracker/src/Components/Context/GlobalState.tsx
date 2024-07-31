import React, { createContext, useReducer, ReactNode, useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../Config/config";
import AppReducer from "./AppReducer";
import Transaction from "../../Types/Transaction";

type User = {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  transactions: Transaction[];
  categoryList: string[];
};

// Define the initial state structure
interface State {
  transactions: Transaction[];
}

// Define the actions
interface DeleteTransactionAction {
  type: "DELETE_TRANSACTION";
  payload: number;
}

interface AddTransactionAction {
  type: "ADD_TRANSACTION";
  payload: Transaction;
}

interface ReadTransactionAction {
  type: "READ_TRANSACTIONS";
  payload: Transaction[];
}

type Action = DeleteTransactionAction | AddTransactionAction | ReadTransactionAction;

// Initial state
const initialState: State = {
  transactions: [],
};

const emptyUser: User = {
  id: "",
  firstName: "",
  secondName: "",
  password: "",
  email: "",
  transactions: initialState.transactions,
  categoryList: ["food", "entertainment", "utilties", "car", "house", "work", "subscription"],
};

// Create context
interface GlobalContextProps extends State {
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  userId: string;
  setUserId: (id: string) => void;
  readTransaction: () => void;
  user: User;
}

const GlobalContext = createContext<GlobalContextProps>({
  transactions: [],
  deleteTransaction: () => {},
  addTransaction: () => {},
  userId: "",
  setUserId: () => {},
  readTransaction: () => {},
  user: emptyUser,
});

// Provider component
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(AppReducer, initialState);
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<User>(emptyUser);

  // Actions
  function deleteTransaction(id: number) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
    // Optionally, removeDataFromFirebase can be called here if needed
  }

  function addTransaction(transaction: Transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
    addDataToFirebase(transaction);
  }

  async function readTransaction() {
    const data = await readDataFromFirebase(userId);
    if (data) {
      dispatch({
        type: "READ_TRANSACTIONS",
        payload: data?.transactions,
      });
    }
  }

  const addDataToFirebase = async (transaction: Transaction) => {
    if (userId !== "") {
      const documentRef = doc(db, "users", userId);
      try {
        await updateDoc(documentRef, { transactions: arrayUnion(transaction) });
        console.log("Transaction added to database");
      } catch (error) {
        console.log("Something went wrong - " + error);
      }
    } else {
      console.log("No current user");
    }
  };

  const readDataFromFirebase = async (userId: string): Promise<User | undefined> => {
    if (userId !== "") {
      const documentRef = doc(db, "users", userId);

      try {
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as User;
          console.log("Data read from Firebase:", data);
          setUser(data);
          return data;
        } else {
          console.log("No such document!");
          return undefined;
        }
      } catch (error) {
        console.log("Something went wrong - " + error);
        return undefined;
      }
    } else {
      console.log("No current user");
      return undefined;
    }
  };

  useEffect(() => {
    console.log("occurred");
    const initializeData = async () => {
      if (userId) {
        console.log("userid", userId);
        const data = await readDataFromFirebase(userId);
        console.log("transactions read");
        if (data) {
          dispatch({
            type: "READ_TRANSACTIONS",
            payload: data.transactions,
          });
        }
      }
    };

    initializeData();
    console.log(userId);
    console.log(state.transactions);
  }, [userId]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        userId,
        setUserId,
        readTransaction,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
