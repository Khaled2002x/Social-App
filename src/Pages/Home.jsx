import React, { useContext } from "react";
import { Context } from "../Context.jsx";

export default function Home() {
  const { count, setCount } = useContext(Context);
  console.log(count);

  return (
    <>
      <div className="text-white">Home: {count}</div>;
      <button className="bg-blue-500 " onClick={() => setCount(4)}>
        Change Count
      </button>
    </>
  );
}
