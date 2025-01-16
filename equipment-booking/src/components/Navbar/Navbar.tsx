import { Link } from "react-router";
import "./Navbar.css";
import useNavbar from "./useNavbar";

export default function Navbar() {
  const { token, handleLogout } = useNavbar();

  return (
    <div className="navbar-container">
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
