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
type Action = { type: "DELETE_TRANSACTION"; payload: number } | { type: "ADD_TRANSACTION"; payload: Transaction } | { type: "READ_TRANSACTIONS"; payload: Transaction[] };

// const updateCategoryList = (newCategory: string) => {
//   let categories =
//   categories.push(newTransaction.category);
//   categories = [...new Set(categories)];
//   return categories;
// };
// The reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    case "ADD_TRANSACTION":
      const newState = {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
      return newState;
    case "READ_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
