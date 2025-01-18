import { useLocation, useRoutes } from "react-router";
import routes from "../Routes/Routes.config";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

/**
 * AppContent component determines which routes are displayed and conditionally
 * renders the Navbar and Footer components based on the current pathname.
 *
 * It uses the `useLocation` hook to access the current location and checks if
 * the pathname is one of the specified paths ("/", "/bookings", "/login", "/register")
 * to decide whether to show the Navbar and Footer.
 *
 * The component renders the routes using the `useRoutes` hook and receives the
 * route configuration from `routes`.
 */
const AppContent = () => {
  const location = useLocation();
  const showNavbarAndFooter = ["/", "/bookings", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavbarAndFooter && <Navbar />}
      {useRoutes(routes)}
      {showNavbarAndFooter && <Footer />}
    </>
  );
};
export default AppContent;
