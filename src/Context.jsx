import React, { useState } from "react";
import { createContext } from "react";
import UserData from "./Components/services/userData";
import { useQuery } from "@tanstack/react-query";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [count, setcount] = useState(10);
  const [token, SetToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const User = useQuery({
    queryFn: UserData,
    queryKey: ["user"],
    enabled: !!localStorage.getItem("token"),
  });

  return (
    <>
      <Context.Provider value={{ count, setcount, token, SetToken, User }}>
        {children}
      </Context.Provider>
    </>
  );
}
