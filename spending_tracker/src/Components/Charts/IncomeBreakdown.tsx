import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Transaction = {
  id: number;
  text: string;
  category: string;
  amount: number;
};

const IncomeBreakdown = () => {
  const { transactions } = useContext(GlobalContext) as { transactions: Transaction[] };

  let aggregatedData: { [key: string]: number } = {};

  for (let i = 0; i < transactions.length; i++) {
    let item: Transaction = transactions[i];
    if (aggregatedData.hasOwnProperty(item.category)) {
      aggregatedData[item.category] += item.amount;
    } else {
      aggregatedData[item.category] = item.amount;
    }
  }

  const labels = Object.keys(aggregatedData);
  const data = Object.values(aggregatedData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(201, 203, 207, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income breakdown",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default IncomeBreakdown;
