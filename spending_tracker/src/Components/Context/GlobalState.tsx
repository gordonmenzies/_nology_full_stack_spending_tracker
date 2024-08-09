import React, { createContext, useReducer, ReactNode, useState, useEffect } from "react";
import { createUserData } from "../Context/auth";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../Config/config";
import AppReducer from "./AppReducer";
import Transaction from "../../Types/Transaction";
import User from "../../Types/User";

// Define the initial state structure
interface State {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  transactions: Transaction[];
  categoryList: string[];
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

interface updateCategory {
  type: "UPDATE_CATEGORY";
  payload: string;
}

interface createNewUser {
  type: "CREATE_USER";
  payload: User;
}

interface deleteCategory {
  type: "DELETE_CATEGORY";
  payload: number;
}

type Action = DeleteTransactionAction | AddTransactionAction | ReadTransactionAction | updateCategory | createNewUser | deleteCategory;

// Initial state
const initialState: State = {
  id: "",
  firstName: "",
  secondName: "",
  password: "",
  email: "",
  transactions: [],
  categoryList: ["food", "income", "entertainment", "utilties", "car", "house", "work", "subscription"],
};

const emptyUser: User = {
  id: "",
  firstName: "",
  secondName: "",
  password: "",
  email: "",
  transactions: initialState.transactions,
  categoryList: ["food", "income", "entertainment", "utilties", "car", "house", "work", "subscription"],
};

// Create context
interface GlobalContextProps extends State {
  transactions: Transaction[];
  categoryList: string[];
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  updateCategory: (category: string) => void;
  deleteCategory: (index: number) => void;
  userId: string;
  setUserId: (id: string) => void;
  readTransaction: () => void;
  createNewUser: (user: User) => void;
  user: User;
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
}

const GlobalContext = createContext<GlobalContextProps>({
  transactions: [],
  categoryList: ["food", "income", "entertainment", "utilties", "car", "house", "work", "subscription"],
  deleteTransaction: () => {},
  addTransaction: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
  userId: "",
  setUserId: () => {},
  readTransaction: () => {},
  createNewUser: () => {},
  user: emptyUser,
  id: "",
  firstName: "",
  secondName: "",
  password: "",
  email: "",
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
    addTransactionToFirebase(transaction);
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

  async function updateCategory(category: string) {
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: category,
    });
    addCategoryToFirebase(category);
  }

  async function deleteCategory(index: number) {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: index,
    });
    removeCategoryFromFirebase(state.categoryList);
  }

  async function createNewUser(user: User) {
    console.log("user", user);
    dispatch({
      type: "CREATE_USER",
      payload: user,
    });
    await createUserData(user.email, user.password, user.id, user.firstName, user.secondName);
    setUserId(user.id);
    console.log(state, "state");
  }

  const addTransactionToFirebase = async (transaction: Transaction) => {
    if (userId !== "") {
      console.log(userId);
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

  const addCategoryToFirebase = async (category: string) => {
    if (userId !== "") {
      const documentRef = doc(db, "users", userId);
      try {
        await updateDoc(documentRef, { categoryList: arrayUnion(category) });
        console.log("category added to database");
      } catch (error) {
        console.log("Something went wrong - " + error);
      }
    } else {
      console.log("No current user");
    }
  };

  const removeCategoryFromFirebase = async (categoryList: string[]) => {
    if (userId !== "") {
      const documentRef = doc(db, "users", userId);
      try {
        await updateDoc(documentRef, { categoryList: state.categoryList });
        console.log("category added to database");
        console.log(state.categoryList);
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
  }, [userId]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        categoryList: state.categoryList,
        deleteTransaction,
        addTransaction,
        updateCategory,
        deleteCategory,
        userId,
        setUserId,
        readTransaction,
        createNewUser,
        user,
        id: state.id,
        firstName: state.firstName,
        secondName: state.secondName,
        password: state.password,
        email: "",
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
