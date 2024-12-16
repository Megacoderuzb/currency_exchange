import React, { useState, useEffect } from "react";
import axios from "axios";

function Converter() {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

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

  const handleConvert = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
  };

  return (
    <div className="card mb-4 p-5">
      <div className="card-body">
        <h5 className="card-title">Valyuta Konvertori</h5>
        <div className="row py-5">
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Miqdor"
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={handleConvert}>
              Konvertatsiya
            </button>
          </div>
        </div>
        <div className="mt-3">
          <h6>
            Natija: {convertedAmount.toFixed(2)} {toCurrency}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Converter;
