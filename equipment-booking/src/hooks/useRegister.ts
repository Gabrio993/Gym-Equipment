import { useState } from "react";
import { authRegister } from "../services/api";

const useRegister = () => {
  const [userNameRegister, setUserNameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const clearMessageAfterDelay = () => {
    setTimeout(() => setMessage(""), 4000);
  };
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
      console.log(response); // debug
      setMessage(`Registrazione riuscita: ${response}, ora puoi effettuare il login`);
    } catch (error) {
      setMessage("Errore nella registrazione.");
      console.log(error); // debug
    } finally {
      setUserNameRegister("");
      setPasswordRegister("");
      clearMessageAfterDelay();
    }
  };
  return {
    handleRegister,
    message,
    userNameRegister,
    passwordRegister,
    setUserNameRegister,
    setPasswordRegister,
  };
};

export default useRegister;
