import { Link } from "react-router";
import useRegister from "../../hooks/useRegister";

/**
 * A component that handles user authentication, both login and registration.
 * It exposes two forms, one for login and one for registration, and displays
 * a message according to the outcome of the operations.
 */
export default function Register() {
  const { handleRegister, userNameRegister, setUserNameRegister, passwordRegister, setPasswordRegister, message, messageType } = useRegister();

  return (
    <>
      <h1 className="text-3xl text-center text-slate-800 mb-4">Autenticazione</h1>
      <div className="form-container bg-slate-800 text-white p-6 mb-10 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Registrazione</h2>
        <form className="register-form flex flex-col gap-4" onSubmit={handleRegister}>
          <label htmlFor="userNameRegister" className="text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="userNameRegister"
            placeholder="Username"
            minLength={3}
            maxLength={10}
            value={userNameRegister}
            onChange={(e) => setUserNameRegister(e.target.value)}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <label htmlFor="passwordRegister" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="passwordRegister"
            minLength={6}
            maxLength={20}
            placeholder="Password"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <button type="submit" className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Registrati
          </button>
          <p className="text-sm">
            Hai già un account?{" "}
            <span>
              <Link className="text-slate-400 hover:text-slate-300 underline" to={"/login"}>
                Login
              </Link>
            </span>
          </p>
        </form>
        {/* Messaggio */}
        {message && <p className={`mt-4 font-semibold text-center ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>{message}</p>}
      </div>
    </>
  );
}
