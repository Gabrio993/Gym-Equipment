import { Link, useNavigate } from "react-router";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <ul className="navbar">
        <Link className="navbar-item" to={"/"}>
          Home
        </Link>
        <Link className="navbar-item" to={"/bookings"}>
          Bookings
        </Link>
        {!token ? (
          <Link className="navbar-item" to={"/login"}>
            Login
          </Link>
        ) : (
          <button className="navbar-item" onClick={handleLogout}>
            Logout
          </button>
        )}
      </ul>
    </div>
  );
}
