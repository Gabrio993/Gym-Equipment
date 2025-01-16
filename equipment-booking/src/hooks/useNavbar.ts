import { useNavigate } from "react-router";

const useNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return {
    token,
    handleLogout,
  };
};

export default useNavbar;
