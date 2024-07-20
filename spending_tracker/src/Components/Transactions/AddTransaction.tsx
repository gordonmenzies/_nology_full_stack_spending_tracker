import React, { useState, useContext, FormEvent } from "react";
import { GlobalContext } from "../Context/GlobalState";

interface Transaction {
  id: number;
  text: string;
  category: string;
  amount: number;
}

export const AddTransaction: React.FC = () => {
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
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <input type="category" value={catgeoryText} onChange={(e) => setCategoryText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
