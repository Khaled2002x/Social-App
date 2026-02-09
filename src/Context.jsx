import React, { useState } from "react";
import { createContext } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [count, setcount] = useState(10);
  return (
    <>
      <Context.Provider value={{ count, setcount }}>
        {children}
      </Context.Provider>
    </>
  );
}
