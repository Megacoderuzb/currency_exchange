import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header text-center p-4 bg-secondary mb-4 ">
      <nav className="nav justify-content-between">
        <h1 className="text-white">Moliyaviy Panel</h1>
        <span className="nav justify-content-between">
          <Link className="text-white nav-link" to="/">
            Hisobot
          </Link>
          <Link className="text-white nav-link" to="/converter">
            Konvertor
          </Link>
          <Link className="text-white nav-link" to="/transactions">
            Tranzaksiyalar
          </Link>
        </span>
      </nav>
    </header>
  );
}

export default Header;
