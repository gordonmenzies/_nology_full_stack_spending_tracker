import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../Context/GlobalState";

// Define the structure of a transaction
interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
}

export const TransactionList: React.FC = () => {
  const { transactions } = useContext(GlobalContext) as { transactions: Transaction[] };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
