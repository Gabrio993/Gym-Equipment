import { Link } from "react-router";
import useNavbar from "../../hooks/useNavbar";
import "./Navbar.css";

/**
 * @component
 * Renders the Navbar component which includes navigation links and authentication control.
 * It shows links for "Home" and "Bookings". If the user is not authenticated, a "Login" link
 * is displayed; if authenticated, a "Logout" button is provided.
 *
 * @returns {JSX.Element} The navbar element
 */
export default function Navbar(): JSX.Element {
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
