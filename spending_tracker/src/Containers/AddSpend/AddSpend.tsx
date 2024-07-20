import { GlobalProvider } from "../../Components/Context/GlobalState";
import { Header } from "../../Components/Transactions/Header";
import { Balance } from "../../Components/Transactions/Balance";
import { IncomeExpenses } from "../../Components/Transactions/IncomeExpenses";
import { TransactionList } from "../../Components/Transactions/TransactionList";
import { AddTransaction } from "../../Components/Transactions/AddTransaction";

const AddSpend = () => {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>
    </div>
  );
};

export default AddSpend;
