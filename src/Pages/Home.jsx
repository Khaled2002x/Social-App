import React, { useContext } from "react";
import { Context } from "../Context.jsx";
import Post from "../Components/post/post.jsx";

export default function Home() {
  const { count, setCount, token } = useContext(Context);
  console.log(count);

  return (
    <>
      <Post />
    </>
  );
}
