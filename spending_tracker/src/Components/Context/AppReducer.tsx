import Transaction from "../../Types/Transaction";
import User from "../../Types/User";
// Define the structure of a transaction

// Define the state structure
interface State {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  transactions: Transaction[];
  categoryList: string[];
}

// Define action types
type Action = { type: "DELETE_TRANSACTION"; payload: number } | { type: "ADD_TRANSACTION"; payload: Transaction } | { type: "READ_TRANSACTIONS"; payload: Transaction[] } | { type: "UPDATE_CATEGORY"; payload: string } | { type: "CREATE_USER"; payload: User };

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
    case "UPDATE_CATEGORY":
      state.categoryList.push(action.payload);
      return {
        ...state,
        categoryList: [action.payload, ...state.categoryList],
      };
    case "CREATE_USER":
      console.log(action.payload);
      const userState = {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        secondName: action.payload.secondName,
        password: action.payload.password,
        email: action.payload.email,
      };
      console.log(userState);
      return userState;
    default:
      return state;
  }
};

export default reducer;
