import React, { useState } from "react";
import { createContext } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [count, setcount] = useState(10);
  const [token, SetToken] = useState(null);
  return (
    <>
      <Context.Provider value={{ count, setcount, token, SetToken }}>
        {children}
      </Context.Provider>
    </>
  );
}
