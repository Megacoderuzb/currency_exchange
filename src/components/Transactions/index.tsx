import { useState, useEffect } from "react";
import { Transaction } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface TransactionsProps {
  transactions: Transaction[];
  onAdd: (transaction: Transaction) => void;
}

function Transactions({ transactions, onAdd }: TransactionsProps) {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<"Kirim" | "Chiqim">("Kirim");
  const [currency, setCurrency] = useState<string>("USD");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/5da7384b86d0f8eac25cca20/latest/USD"
      )
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const handleAddTransaction = () => {
    if (!amount || !category || !currency) {
      alert("Miqdor, kategoriya va valyuta bo'sh qolmasin!");
      return;
    }

    const usdAmount = rates[currency]
      ? parseFloat(amount) / rates[currency]
      : parseFloat(amount);

    const newTransaction: Transaction = {
      id: uuidv4(),
      amount: usdAmount,
      category,
      type,
      currency,
      date: new Date().toLocaleDateString(),
    };

    onAdd(newTransaction);
    setAmount("");
    setCategory("");
    setCurrency("USD");
  };

  const filteredTransactions = filterCategory
    ? transactions.filter((t) => t.category === filterCategory)
    : transactions;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title pt-4">Tranzaksiyalar</h5>
        <div className="row mb-3 py-4">
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Miqdor"
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategoriya"
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value as "Kirim" | "Chiqim")}
            >
              <option value="Kirim">Daromad</option>
              <option value="Chiqim">Xarajat</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={handleAddTransaction}
            >
              Qo'shish
            </button>
          </div>
        </div>
        <div className="mb-3 py-4">
          <input
            type="text"
            className="form-control"
            placeholder="Filtr Kategoriya"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>
        <ul className="list-group py-4">
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id} className="list-group-item">
              {transaction.date} - {transaction.category} -{" "}
              {transaction.amount.toFixed(2)} USD ({transaction.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Transactions;
