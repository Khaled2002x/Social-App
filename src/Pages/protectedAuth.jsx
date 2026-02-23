import { Navigate } from "react-router-dom";
import { Context } from "../Context";
import { useContext } from "react";

export default function ProtectedAuth({ children }) {
  const { token } = useContext(Context);
  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
