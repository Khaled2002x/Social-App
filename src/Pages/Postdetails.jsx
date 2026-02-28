import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "../Components/post/Card";
import Loading from "../Components/post/spinner";

export default function Postdetails() {
  const { id } = useParams();
  async function getpostdetails() {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return [data.data.post];
  }
  const { data, isLoading } = useQuery({
    queryFn: getpostdetails,
    queryKey: ["postId", id],
  });

  if (isLoading || !data) return <Loading />;

  return <Card posts={data} details={true} />;
}
