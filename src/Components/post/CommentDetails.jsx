import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeleteComment } from "../services/DeleteComment";
import src from "../../assets/images/user.jpeg";
import useFetch from "./useFetch";
import { Context } from "../../Context";
import Modeladdcomment from "./Modeladdcomment";
import { Button } from "@heroui/react";
export default function CommentDetails({ post, details }) {
  const { mutate, isPending } = useDeleteComment();
  const { User } = useContext(Context);
  const user_id = User.data.user.id;

  const { isLoading, data } = useFetch({ post, details });

  return (
    <div className="flex flex-col gap-3">
      {isLoading && <p>comments is loading...</p>}
      {data?.comments?.map((comment) => (
        <div key={comment._id} className="flex items-center space-x-2">
          <img
            src={
              comment?.commentCreator?.photo
                ? comment.commentCreator.photo
                : src
            }
            alt={comment?.commentCreator?.name}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">
              {comment?.commentCreator?.name}
            </p>
            <p className="text-gray-500 text-sm">{comment.content}</p>
          </div>
          <div className="DeleteComment ms-auto flex items-center gap-2">
            {user_id === comment.commentCreator._id && (
              <>
                <Button
                  isLoading={isPending}
                  onClick={() =>
                    mutate({ postId: post._id, commentId: comment._id })
                  }
                  className="bg-red-600 active:scale-75 duration-75 rounded-2xl text-white p-2"
                >
                  Delete
                </Button>
                <Modeladdcomment postid={post._id} comment={comment} />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
