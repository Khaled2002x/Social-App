import { Navigate } from "react-router-dom";
import { Context } from "../Context";
import { useContext } from "react";

export default function ProtectedRout({ children }) {
  const { token } = useContext(Context);
  if (token) {
    return children;
  } else {
    return <Navigate to={"auth/signin"} />;
  }
}
