import { Link } from "react-router";
import useLogin from "../../hooks/useLogin";
import "./Login.css";

/**
 * @component
 * A component that handles user authentication login.
 * It displays a message according to the outcome of the operations.
 *
 * @returns {JSX.Element} The login element
 */
export default function Login(): JSX.Element {
  const { handleLogin, userNameLogin, setUserNameLogin, passwordLogin, setPasswordLogin, message, loading } = useLogin();

  return (
    <>
      <h2 className="text-3xl text-center text-slate-800 mb-4">Autenticazione</h2>
      <div className="form-container bg-slate-800 text-white p-6  mb-10 rounded-lg shadow-lg max-w-md mx-auto my-auto">
        {/* Login */}
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="login-form flex flex-col gap-4" onSubmit={handleLogin}>
          <label htmlFor="userName" className="text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="userName"
            placeholder="Username"
            value={userNameLogin}
            onChange={(e) => setUserNameLogin(e.target.value)}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            className="p-2 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              "Accedi"
            )}
          </button>
          <p className="text-sm">
            Non hai un account?{" "}
            <span>
              <Link className="text-slate-400 hover:text-slate-300 underline" to={"/register"}>
                Registrati
              </Link>
            </span>
          </p>
        </form>

        {/* Messaggio */}
        {message && <p className="mt-4 text-red-500 font-semibold text-center">{message}</p>}
      </div>
    </>
  );
}
