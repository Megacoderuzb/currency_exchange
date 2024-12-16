import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  currency: string;
  type: "Kirim" | "Chiqim";
  date: string;
}

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  rates: { [key: string]: number };
  setRates: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <AppContext.Provider
      value={{ transactions, addTransaction, rates, setRates }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
