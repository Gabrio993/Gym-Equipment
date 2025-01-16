import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginResponse } from "../types/auth";
import { authLogin } from "../services/api";

const useLogin = () => {
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const clearMessageAfterDelay = () => {
    setTimeout(() => setMessage(""), 4000);
  };

  /**
   * Handles the login form submission.
   * @param {React.FormEvent} e - The form event.
   *
   * Calls the {@link authLogin} function with the current values of the
   * `userNameLogin` and `passwordLogin` states.
   *
   * If the login is successful, sets the `message` state to a success message
   * containing the received token and stores the token in local storage.
   *
   * If the login fails, sets the `message` state to an error message.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Controllo dei campi vuoti
    if (!userNameLogin.trim() || !passwordLogin.trim()) {
      setMessage("Inserisci username e password.");
      clearMessageAfterDelay();
      return;
    }
    try {
      const response: LoginResponse = await authLogin(userNameLogin, passwordLogin);
      setMessage(`Login riuscito!`);
      localStorage.setItem("authToken", response.token);
      navigate("/");
    } catch (error) {
      setMessage("Errore durante il login.");
      console.log(error);
    } finally {
      setUserNameLogin("");
      setPasswordLogin("");
      clearMessageAfterDelay();
    }
  };

  return {
    userNameLogin,
    setUserNameLogin,
    passwordLogin,
    setPasswordLogin,
    message,
    handleLogin,
  };
};

export default useLogin;
