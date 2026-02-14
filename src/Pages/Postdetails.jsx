import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "../Components/post/Card";
import Loading from "../Components/post/spinner";

export default function Postdetails() {
  const { id } = useParams();
  async function getpostdetails() {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return [data.post];
  }
  const { data, isLoading } = useQuery({
    queryFn: getpostdetails,
    queryKey: ["postId", id],
  });
  if (isLoading) return <Loading />;

  return <Card posts={data} />;
}
