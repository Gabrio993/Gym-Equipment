import { useState } from "react";
import { authRegister } from "../services/api";
import { UseRegisterReturn } from "../types/register";
import { useNavigate } from "react-router";

/**
 * Handles user registration.
 *
 * This hook provides state and functionality for handling user registration
 * operations, including setting and clearing registration credentials,
 * managing registration messages, and navigating upon successful registration.
 *
 * @returns {UseRegisterReturn}
 */
const useRegister = (): UseRegisterReturn => {
  const [userNameRegister, setUserNameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirmPasswordRegister, setConfirmPasswordRegister] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const navigate = useNavigate();

  /**
   * Clears the message after a delay of 3 seconds.
   */
  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
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

    // Check empty fields
    if (!userNameRegister.trim() || !passwordRegister.trim()) {
      setMessage("Inserisci username e password.");
      setMessageType("error");
      clearMessageAfterDelay();
      return;
    }
    // Check if username contains at least one letter
    if (!/[a-zA-Z]/.test(userNameRegister)) {
      setMessage("Lo username deve contenere almeno una lettera.");
      setMessageType("error");
      clearMessageAfterDelay();
      return;
    }
    // check between the two password
    if (confirmPasswordRegister !== passwordRegister) {
      setMessage("Le password sembrano essere diverse!");
      setMessageType("error");
      clearMessageAfterDelay();
      return;
    } else {
      setConfirmPasswordRegister(passwordRegister);
    }

    try {
      const response = await authRegister(userNameRegister, passwordRegister);
      setMessage(`Registrazione riuscita: ${response}, ora puoi effettuare il login`);
      setMessageType("success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setMessage(`Errore nella registrazione`);
      setMessageType("error");
    } finally {
      setUserNameRegister("");
      setPasswordRegister("");
      setConfirmPasswordRegister("");
      clearMessageAfterDelay();
    }
  };
  return {
    handleRegister,
    message,
    messageType,
    userNameRegister,
    passwordRegister,
    setUserNameRegister,
    setPasswordRegister,
    confirmPasswordRegister,
    setConfirmPasswordRegister,
  };
};

export default useRegister;
