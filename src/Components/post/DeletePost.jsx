import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export default function useDeletePost() {
  async function SendData({ postId }) {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  const refQuery = useQueryClient();
  return useMutation({
    mutationFn: SendData,
    onSuccess: (data) => {
      refQuery.invalidateQueries({
        queryKey: ["post"],
      });
      refQuery.invalidateQueries({
        queryKey: ["postId"],
      });
      refQuery.invalidateQueries({
        queryKey: ["userpost"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
