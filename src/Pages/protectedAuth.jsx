import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
