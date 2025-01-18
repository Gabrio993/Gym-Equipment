import { RouteObject } from "react-router";
import Home from "../components/Home/Home";
import Bookings from "../components/Bookings/Bookings";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import NotFound from "../components/NotFound/NotFound";

// RouteObject wit routes path
const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/bookings", element: <Bookings /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
