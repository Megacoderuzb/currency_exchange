import { Transaction } from "../../context/AppContext";

interface SummaryProps {
  transactions: Transaction[];
}

function Summary({ transactions }: SummaryProps) {
  const income = transactions
    .filter((t) => t.type === "Kirim")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "Chiqim")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Hisobot</h5>
        <p>Jami Daromad: {income} $</p>
        <p>Jami Xarajat: {expense} $</p>
        <p>Sof Balans: {balance} $</p>
      </div>
    </div>
  );
}

export default Summary;
