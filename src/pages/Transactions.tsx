import Transactions from '../components/Transactions';
import { useAppContext } from '../context/AppContext';

function TransactionsPage() {
  const { transactions, addTransaction } = useAppContext();

  return <Transactions transactions={transactions} onAdd={addTransaction} />;
}

export default TransactionsPage;
