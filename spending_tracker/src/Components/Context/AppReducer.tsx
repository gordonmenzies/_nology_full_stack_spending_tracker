// Define the structure of a transaction
interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
}

// Define the state structure
interface State {
  transactions: Transaction[];
}

// Define action types
type Action = { type: "DELETE_TRANSACTION"; payload: number } | { type: "ADD_TRANSACTION"; payload: Transaction };

// The reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

export default reducer;
