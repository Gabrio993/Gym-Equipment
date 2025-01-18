export interface UseLoginReturn {
  userNameLogin: string;
  setUserNameLogin: React.Dispatch<React.SetStateAction<string>>;
  passwordLogin: string;
  setPasswordLogin: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}
