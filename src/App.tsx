import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/Transactions";
import Converter from "./components/Converter";
import { AppProvider } from "./context/AppContext";

import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/converter" element={<Converter />} />
          </Routes>
        </div>
        <footer className="text-center mt-4">
          &copy;{" "}
          <a
            href="https://t.me/just_programmer_man"
            className="text-black text-italic"
          >
            {" "}
            just_programmer_man
          </a>
          .
        </footer>
      </Router>
    </AppProvider>
  );
}

export default App;
