import { Link } from "react-router";
import useRegister from "./useRegister";

/**
 * A component that handles user authentication, both login and registration.
 * It exposes two forms, one for login and one for registration, and displays
 * a message according to the outcome of the operations.
 */
export default function Register() {
  const { handleRegister, userNameRegister, setUserNameRegister, passwordRegister, setPasswordRegister, message } = useRegister();

  return (
    <>
      <h1>Autenticazione</h1>
      <div className="form-container">
        <h2>Registrazione</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userNameRegister"
            placeholder="Username"
            value={userNameRegister}
            onChange={(e) => setUserNameRegister(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="passwordRegister"
            placeholder="Password"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
          <button type="submit">Registrati</button>
          <p>
            Hai già un account?{" "}
            <span>
              <Link className="login" to={"/login"}>
                Fai Login!
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
