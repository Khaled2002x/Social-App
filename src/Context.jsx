import React, { useState } from "react";
import { createContext } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [count, setCount] = useState(20);
  return (
    <Context.Provider value={{ count, setCount }}>{children}</Context.Provider>
  );
}
