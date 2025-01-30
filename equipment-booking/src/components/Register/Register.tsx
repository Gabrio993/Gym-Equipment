import { Link } from "react-router";
import useRegister from "../../hooks/useRegister";

/**
 * @component
 * A component that handles user authentication registration.
 * It displays a message according to the outcome of the operations.
 *
 * @returns {JSX.Element} The register element
 */
export default function Register(): JSX.Element {
  const {
    handleRegister,
    userNameRegister,
    setUserNameRegister,
    passwordRegister,
    setPasswordRegister,
    message,
    messageType,
    confirmPasswordRegister,
    setConfirmPasswordRegister,
    loading,
  } = useRegister();

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
          <label htmlFor="confirmPasswordRegister" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="confirmPasswordRegister"
            minLength={6}
            maxLength={20}
            placeholder="Conferma Password"
            value={confirmPasswordRegister}
            onChange={(e) => setConfirmPasswordRegister(e.target.value)}
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
              "Registrati"
            )}
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
