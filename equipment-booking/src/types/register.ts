export interface UseRegisterReturn {
  handleRegister: (e: React.FormEvent) => void;
  message: string;
  messageType: "success" | "error" | "";
  userNameRegister: string;
  passwordRegister: string;
  setUserNameRegister: React.Dispatch<React.SetStateAction<string>>;
  setPasswordRegister: React.Dispatch<React.SetStateAction<string>>;
  confirmPasswordRegister: string;
  setConfirmPasswordRegister: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}
// Dispatch is a data type representing a function that accepts a
// generic (T) value and returns void. In this case the T is <React.SetStateAction<string>
