import { Context } from "../Context.jsx";
import Post from "../Components/post/post.jsx";
import Addpost from "../Components/post/Addpost.jsx";

export default function Home() {
  return (
    <>
      <Addpost />
      <Post />
    </>
  );
}
