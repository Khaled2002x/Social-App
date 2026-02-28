import "./App.css";
import { Button } from "@heroui/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./mainlayout/layout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Authlayout from "./Pages/Auth/authlayout";
import Signin from "./Pages/Auth/signin";
import SignUp from "./Pages/Auth/signup";
import "@fortawesome/free-brands-svg-icons";
import ProtectedRout from "./Pages/ProtectedRoute";
import ProtectedAuth from "./Pages/protectedAuth";
import Postdetails from "./Pages/Postdetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Changepassword from "./Pages/changepassword.jsx";

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRout>
        <Layout />
      </ProtectedRout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Postdetails />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/changePassword",
        element: <Changepassword />,
      },
    ],
  },
  {
    path: "auth",
    element: (
      <ProtectedAuth>
        {" "}
        <Authlayout />
      </ProtectedAuth>
    ),
    children: [
      { path: "signin", element: <Signin /> },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      {" "}
      <RouterProvider router={routes} />;
      <ToastContainer />
    </>
  );
}

export default App;
