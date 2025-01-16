import { Link } from "react-router";
import "./Navbar.css";
import useNavbar from "../../hooks/useNavbar";

export default function Navbar() {
  const { token, handleLogout } = useNavbar();

  return (
    <div className="navbar-container bg-slate-800 h-16">
      <ul className="navbar flex justify-evenly items-center  h-full ">
        <Link className="navbar-item h-full  hover:bg-slate-300 flex items-center justify-center w-24   " to={"/"}>
          Home
        </Link>
        <Link className="navbar-item h-full  hover:bg-slate-300 flex items-center justify-center w-24 " to={"/bookings"}>
          Bookings
        </Link>
        {!token ? (
          <Link className="navbar-item h-full  hover:bg-slate-300 flex items-center justify-center w-24 " to={"/login"}>
            Login
          </Link>
        ) : (
          <button className="navbar-item h-full  hover:bg-slate-300 flex items-center justify-center w-24 " onClick={handleLogout}>
            Logout
          </button>
        )}
      </ul>
    </div>
  );
}
