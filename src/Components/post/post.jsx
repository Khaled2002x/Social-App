import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "./spinner";
import Card from "./Card";
export default function Post() {
  async function GetPost() {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/posts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data.data.posts;
  }
  const { data, isLoading } = useQuery({
    queryFn: GetPost,
    queryKey: ["post"],
  });

  if (isLoading) return <Loading />;
  return <Card posts={data} details={false} />;
}
