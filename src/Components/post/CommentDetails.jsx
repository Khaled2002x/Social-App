import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CommentDetails({ post, details }) {
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
  return (
    <div>
      {isLoading && <p>comments is loading...</p>}
      {data?.comments?.map((comment) => (
        <div key={comment._id} className="flex items-center space-x-2">
          <img
            src={comment?.commentCreator?.photo}
            alt={comment?.commentCreator?.name}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">
              {comment?.commentCreator?.name}
            </p>
            <p className="text-gray-500 text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
