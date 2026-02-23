import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdInsertPhoto } from "react-icons/md";
import { Input } from "@heroui/react";
import { IoMdSend } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function AddComment({ post }) {
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
    mutate(formData);
  }
  async function SendData(Data) {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${post._id}/comments`,

      Data,

      {
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
  const queryRefresh = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: SendData,
    onSuccess: () => {
      reset();
      queryRefresh.invalidateQueries({
        queryKey: ["comment"],
      });
      queryRefresh.invalidateQueries({
        queryKey: ["post"],
      });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit(AddComment)}
        className="my-3 gap-3.5 flex  justify-center items-center"
      >
        <Input
          {...register("content")}
          endContent
          variant="bordered"
          type="text"
          placeholder="add comment"
        />
        <input onChange={getinputimage} ref={Inputfile} type="file" hidden />
        <MdInsertPhoto
          onClick={() => Inputfile.current.click()}
          className="size-9"
        />
        <button className="  text-sky-400" type="submit">
          <IoMdSend className="text-3xl" />
        </button>
      </form>
    </div>
  );
}
