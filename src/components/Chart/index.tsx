import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Transaction } from "../../context/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  transactions: Transaction[];
}

function Chart({ transactions }: ChartProps) {
  const expenseCategories = transactions
    .filter((t) => t.type === "Chiqim")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as { [key: string]: number });

  const incomeCategories = transactions
    .filter((t) => t.type === "Kirim")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as { [key: string]: number });

  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const incomeData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        data: Object.values(incomeCategories),
        backgroundColor: [
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  const options = {
    animation: {
      duration: 1500,
      easing: "easeInOutBounce",
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Daromad va Xarajat Diagrammalari</h5>
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-center">Xarajat Kategoriyalari</h6>
            <Doughnut data={expenseData} options={options} />
          </div>
          <div className="col-md-6">
            <h6 className="text-center">Daromad Kategoriyalari</h6>
            <Doughnut data={incomeData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
