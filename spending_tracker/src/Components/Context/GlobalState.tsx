import React, { createContext, useReducer, ReactNode, Dispatch, useState } from "react";
import AppReducer from "./AppReducer";

// Define the structure of a transaction
interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
}

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

type Action = DeleteTransactionAction | AddTransactionAction;

// Initial state
const initialState: State = {
  transactions: [],
};

// Create context
interface GlobalContextProps extends State {
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
  userId: string;
  setUserId: (id: string) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  transactions: [],
  deleteTransaction: () => {},
  addTransaction: () => {},
  userId: "",
  setUserId: () => {},
});

// Provider component
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(AppReducer, initialState);
  const [userId, setUserId] = useState<string>("");

  // Actions
  function deleteTransaction(id: number) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction: Transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        userId,
        setUserId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
