import "./AddSpend.scss";

import { GlobalProvider } from "../../Components/Context/GlobalState";
import { Balance } from "../../Components/Transactions/Balance";
import { IncomeExpenses } from "../../Components/Transactions/IncomeExpenses";
import { TransactionList } from "../../Components/Transactions/TransactionList";
import { AddTransactionLite } from "../../Components/Transactions/AddTransactionLite";
import { Menu } from "../../Components/Menu/Menu";

const AddSpend = () => {
  return (
    <div>
      <GlobalProvider>
        <div className="container">
          <Menu></Menu>
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransactionLite />
        </div>
      </GlobalProvider>
    </div>
  );
};

export default AddSpend;
