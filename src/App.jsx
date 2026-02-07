import "./App.css";
import { Button } from "@heroui/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./mainlayout/layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Authlayout from "./Pages/Auth/authlayout";
import Signin from "./Pages/Auth/signin";
import SignUp from "./Pages/Auth/signup";
const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "About",
        element: <About />,
      },
    ],
  },
  {
    path: "auth",
    element: <Authlayout />,
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
  return <RouterProvider router={routes} />;
}

export default App;
