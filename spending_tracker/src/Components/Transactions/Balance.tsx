import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const Balance: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts: number[] = transactions.map((transaction) => transaction.amount);
  const total: string = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="balance">
      <h1>${total}</h1>
    </div>
  );
};
