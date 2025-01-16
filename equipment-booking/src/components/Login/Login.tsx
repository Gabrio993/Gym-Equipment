import { Link } from "react-router";
import useLogin from "./useLogin";
import "./Login.css";

/**
 * A component that handles user authentication, both login and registration.
 * It exposes two forms, one for login and one for registration, and displays
 * a message according to the outcome of the operations.
 */
export default function Login() {
  const { handleLogin, userNameLogin, setUserNameLogin, passwordLogin, setPasswordLogin, message } = useLogin();

  return (
    <>
      <h1>Autenticazione</h1>
      <div className="form-container">
        {/* Login */}
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="userName">Username</label>
          <input type="text" id="userName" placeholder="Username" value={userNameLogin} onChange={(e) => setUserNameLogin(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />

          <button type="submit">Accedi</button>
          <p>
            Non hai un account?{" "}
            <span>
              <Link className="register" to={"/register"}>
                Registrati
              </Link>
            </span>
          </p>
        </form>

        {/* Messaggio */}
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
