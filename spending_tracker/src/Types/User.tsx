import Transaction from "./Transaction";

export default interface User {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  transactions: Transaction[];
  categoryList: string[];
}
