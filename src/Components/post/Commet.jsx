import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdInsertPhoto } from "react-icons/md";
import { Input } from "@heroui/react";
import { IoMdSend } from "react-icons/io";
import CommentDetails from "./CommentDetails";
export default function Commet({ post, details }) {
  const [commentImage, SetCommentImage] = useState(null);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const Inputfile = useRef();
  async function AddComment(dataform) {
    const formData = new FormData();
    formData.append("content", dataform.content);
    formData.append("image", commentImage);
    reset();
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${post._id}/comments`,
      {
        formData,

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  function getinputimage(e) {
    SetCommentImage(e.target.files[0]);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(AddComment)}
        className="my-3 flex  justify-center items-center"
      >
        <Input
          {...register("content")}
          endContent
          variant="underlined"
          type="text"
          placeholder="add comment"
        />
        <input onChange={getinputimage} ref={Inputfile} type="file" hidden />
        <MdInsertPhoto onClick={() => Inputfile.current.click()} />
        <button className="ms-3 text-sky-400" type="submit">
          <IoMdSend />
        </button>
      </form>
      {!details && post.topComment ? (
        <div className="flex items-center space-x-2">
          <img
            src={post.topComment?.commentCreator?.photo}
            alt={post.topComment?.commentCreator?.name}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">
              {post.topComment?.commentCreator?.name}
            </p>
            <p className="text-gray-500 text-sm">{post.topComment?.content}</p>
          </div>
        </div>
      ) : (
        <p> </p>
      )}
      {details && (
        <>
          <CommentDetails post={post} details={details} />
        </>
      )}
    </div>
  );
}
