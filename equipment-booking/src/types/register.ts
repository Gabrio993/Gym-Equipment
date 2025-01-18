export interface UseRegisterReturn {
  handleRegister: (e: React.FormEvent) => void;
  message: string;
  messageType: "success" | "error" | "";
  userNameRegister: string;
  passwordRegister: string;
  setUserNameRegister: React.Dispatch<React.SetStateAction<string>>;
  setPasswordRegister: React.Dispatch<React.SetStateAction<string>>;
}
