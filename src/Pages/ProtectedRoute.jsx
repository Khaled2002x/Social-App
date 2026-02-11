import { Navigate } from "react-router-dom";

export default function ProtectedRout({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"auth/signin"} />;
  }
}
