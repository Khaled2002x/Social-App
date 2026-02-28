import { Button, Input, Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdInsertPhoto } from "react-icons/md";
import Loading from "./spinner";
import { toast } from "react-toastify";

export default function Addpost() {
  const { register, reset, handleSubmit } = useForm({});

  const Inputfile = useRef();
  const [image, setimage] = useState(null);
  function handelimage(e) {
    console.log(e.target.files[0]);

    setimage(e.target.files[0]);
  }
  async function SendAddPost(formdata) {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  const queryclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: SendAddPost,
    onSuccess: (data) => {
      reset();
      queryclient.invalidateQueries({
        queryKey: ["post"],
      });
      queryclient.invalidateQueries({
        queryKey: ["postId"],
      });
      queryclient.invalidateQueries({
        queryKey: ["userpost"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function addPost(dataform) {
    const formdata = new FormData();
    formdata.append("body", dataform.body);
    if (image) {
      formdata.append("image", image);
    }

    mutate(formdata);
  }

  return (
    <>
      <div className=" z-100  p-5 w-full md:w-1/2 m-auto">
        {/* component */}

        <style
          dangerouslySetInnerHTML={{
            __html: "\n  body {background:white !important;}\n",
          }}
        />
        <div className="editor  min-w-full rounded-2xl mx-auto w-10/12 flex flex-col g-3 text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <form onSubmit={handleSubmit(addPost)}>
            <Input
              {...register("body")}
              className=""
              spellCheck="false"
              placeholder="What is in your mind?"
              type="text"
            />
            <input type="file" hidden onChange={handelimage} ref={Inputfile} />
            <Button
              className="mt-5 w-full"
              onClick={() => Inputfile.current.click()}
            >
              <MdInsertPhoto />
              Upload post image
            </Button>

            {/* icons */}

            {/* buttons */}
            <div className="buttons m-3 justify-end flex">
              <Button
                isLoading={isPending}
                type="submit"
                className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
              >
                Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
