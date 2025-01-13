import { useState } from "react";
import { authRegister, authLogin } from "../../services/api";
import { LoginResponse } from "../../types/auth";
import { useNavigate } from "react-router";

/**
 * A component that handles user authentication, both login and registration.
 * It exposes two forms, one for login and one for registration, and displays
 * a message according to the outcome of the operations.
 */
export default function Login() {
  const [userNameRegister, setUserNameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [userNameLogin, setUserNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  /**
   * Handles the registration form submission.
   * @param {React.FormEvent} e - The form event.
   *
   * Calls the {@link authRegister} function with the current values of the
   * `userNameRegister` and `passwordRegister` states.
   *
   * If the registration is successful, sets the `message` state to a success message
   * containing the response message.
   *
   * If the registration fails, sets the `message` state to an error message.
   */

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authRegister(userNameRegister, passwordRegister);
      console.log(response);
      setMessage(`Registrazione riuscita: ${response}`);
    } catch (error) {
      setMessage("Errore nella registrazione.");
      console.log(error);
    }
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
    try {
      const response: LoginResponse = await authLogin(userNameLogin, passwordLogin);
      setMessage(`Login riuscito!`);
      localStorage.setItem("authToken", response.token);
      navigate("/");
    } catch (error) {
      setMessage("Errore durante il login.");
      console.log(error);
    }
  };

  return (
    <>
      <h1>Autenticazione</h1>
      <div className="form-container">
        {/* Login */}
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="userName">Username</label>
          <input type="text" id="userName" value={userNameLogin} onChange={(e) => setUserNameLogin(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
          <button type="submit">Accedi</button>
        </form>

        {/* Registrazione */}
        <h2>Registrazione</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <label htmlFor="userName">Username</label>
          <input type="text" id="userNameRegister" value={userNameRegister} onChange={(e) => setUserNameRegister(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="passwordRegister" value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} />
          <button type="submit">Registrati</button>
        </form>
        {/* Messaggio */}
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
