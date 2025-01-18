import { useNavigate } from "react-router";
import { UseNavbarReturn } from "../types/navbar";

/**
 * Custom hook for managing Navbar behavior.
 *
 * This hook provides authentication token retrieval and logout functionality.
 * It retrieves the authentication token from local storage and provides a
 * function to handle user logout by clearing the token and redirecting to the login page.
 *
 * @returns {UseNavbarReturn} An object containing:
 * - `token`: (string | null) The authentication token from local storage.
 * - `handleLogout`: (Function) A function to remove the auth token and navigate to the login page.
 */

const useNavbar = (): UseNavbarReturn => {
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("authToken");

  /**
   * Handles user logout.
   *
   * Removes the authentication token from local storage and navigates to the
   * login page.
   */
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return {
    token,
    handleLogout,
  };
};

export default useNavbar;
