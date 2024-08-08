import "./transactions.scss";
import React, { useState, useContext, FormEvent } from "react";
import { GlobalContext } from "../Context/GlobalState";
import Transaction from "../../Types/Transaction";

export const AddTransactionLite: React.FC = () => {
  const { user } = useContext(GlobalContext);
  const [text, setText] = useState<string>("");
  const [categoryText, setCategoryText] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      category: categoryText,
      amount: +amount,
      date: new Date(),
    };

    addTransaction(newTransaction);
  };

  console.log(user);

  return (
    <div className="container-lite">
      <form onSubmit={onSubmit}>
        <div className="form-control-lite">
          <input className="input-lite" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Item" />
          <select className="input-lite" id="category-select" onChange={(e) => setCategoryText(e.target.value)}>
            <option value="default">Select a category</option>
            {user.categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="amount"></label>
          <input className="input-lite" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};
