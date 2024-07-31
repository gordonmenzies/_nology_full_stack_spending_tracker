import "./transactions.scss";
import React, { useState, useContext, FormEvent } from "react";
import { GlobalContext } from "../Context/GlobalState";

interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
}

export const AddTransactionLite: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [catgeoryText, setCategoryText] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      category: catgeoryText,
      amount: +amount,
    };

    addTransaction(newTransaction);
  };

  return (
    <div className="container-lite">
      <form onSubmit={onSubmit}>
        <div className="form-control-lite">
          <input className="input-lite" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Item" />
          <input className="input-lite" type="category" value={catgeoryText} onChange={(e) => setCategoryText(e.target.value)} placeholder="Category" />
          <label htmlFor="amount"></label>
          <input className="input-lite" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};
