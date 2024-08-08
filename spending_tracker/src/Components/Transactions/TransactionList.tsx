import React, { useContext } from "react";
import { TransactionComp } from "./TransactionComp";
import { GlobalContext } from "../Context/GlobalState";
import Transaction from "../../Types/Transaction";

export const TransactionList: React.FC = () => {
  const { transactions } = useContext(GlobalContext) as { transactions: Transaction[] };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <TransactionComp key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
