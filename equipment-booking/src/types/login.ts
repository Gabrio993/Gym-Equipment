export interface UseLoginReturn {
  userNameLogin: string;
  setUserNameLogin: React.Dispatch<React.SetStateAction<string>>; // Dispatch is a data type representing a function that accepts a generic (T) value and returns void. In this case the T is <React.SetStateAction<string>
  passwordLogin: string;
  setPasswordLogin: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}
