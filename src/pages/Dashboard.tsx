import Summary from '../components/Summary';
import Chart from '../components/Chart';
import { useAppContext } from '../context/AppContext';

function Dashboard() {
  const { transactions } = useAppContext();

  return (
    <>
      <Summary transactions={transactions} />
      <Chart transactions={transactions} />
    </>
  );
}

export default Dashboard;
