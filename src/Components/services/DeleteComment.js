import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
export const useDeleteComment = () => {
  const refquery = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async ({ postId, commentId }) => {
      const { data } = await axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(postId, commentId);
      console.log(typeof postId, postId.length);
      console.log(typeof commentId, commentId.length);
      return data;
    },
    onSuccess: (data) => {
      refquery.invalidateQueries({
        queryKey: ["comment"],
      });
      refquery.invalidateQueries({
        queryKey: ["post"],
      });
      refquery.invalidateQueries({
        queryKey: ["postId"],
      });
      refquery.invalidateQueries({
        queryKey: ["userpost"],
      });
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  return mutatation;
};
