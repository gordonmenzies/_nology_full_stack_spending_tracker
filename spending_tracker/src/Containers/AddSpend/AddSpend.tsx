import "./AddSpend.scss";

import { Balance } from "../../Components/Transactions/Balance";
import { IncomeExpenses } from "../../Components/Transactions/IncomeExpenses";
import { TransactionList } from "../../Components/Transactions/TransactionList";
import { AddTransactionLite } from "../../Components/Transactions/AddTransactionLite";
import { Menu } from "../../Components/Menu/Menu";

const AddSpend = () => {
  return (
    <div>
      <div className="container">
        <Menu></Menu>
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransactionLite />
      </div>
    </div>
  );
};

export default AddSpend;
