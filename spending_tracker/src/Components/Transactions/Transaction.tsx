import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

// Define the structure of a transaction
interface TransactionProps {
  transaction: {
    id: number;
    text: string;
    category: string;
    amount: number;
  };
}

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}{" "}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
        x
      </button>
    </li>
  );
};
