import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

export function useLogout() {
  const navigate = useNavigate();
  const { SetToken } = useContext(Context);
  const Logout = () => {
    localStorage.removeItem("token");
    SetToken(null);
    console.log("khaled");
    navigate("/auth/signin", { replace: true });
  };

  return Logout;
}
