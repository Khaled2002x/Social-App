import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useFetch({ post, details }) {
  async function getcomment() {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data.data;
  }
  const { isLoading, data } = useQuery({
    queryFn: getcomment,
    queryKey: ["comment", post._id],
    enabled: details,
  });
  return {
    isLoading,
    data,
  };
}
