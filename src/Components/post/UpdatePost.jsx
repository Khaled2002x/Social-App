import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdInsertPhoto } from "react-icons/md";
import Loading from "./spinner";
import { toast } from "react-toastify";

export default function UpdatePost({ post, isOpen, onOpenChange }) {
  const { register, reset, setValue, handleSubmit } = useForm({
    defaultValues: {
      body: "",
    },
  });
  const InputFIle = useRef();
  const [image, setimage] = useState(null);
  async function sendata(formdata) {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${post._id}`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  const querClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: sendata,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();

      querClient.invalidateQueries({
        queryKey: ["post"],
      });
      querClient.invalidateQueries({
        queryKey: ["postId"],
      });
      querClient.invalidateQueries({
        queryKey: ["userpost"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function SubmitForm(data) {
    const formdata = new FormData();
    formdata.append("body", data.body);
    formdata.append("image", image);
    mutate(formdata);
  }

  useEffect(() => {
    if (isOpen && post) {
      setValue("body", post.body);
    }
  }, [isOpen, post, setValue]);
  function HandelImage(e) {
    console.log(e.target.files[0]);

    setimage(e.target.files[0]);
  }
  return (
    <>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update post
              </ModalHeader>
              <form onSubmit={handleSubmit(SubmitForm)}>
                <ModalBody>
                  <Input
                    {...register("body")}
                    type="text"
                    placeholder="update your comment"
                  />
                  <Button onClick={() => InputFIle.current.click()}>
                    <MdInsertPhoto className="size-9" />
                    Upload post image
                  </Button>

                  <Input
                    onChange={HandelImage}
                    ref={InputFIle}
                    hidden
                    className=" hidden"
                    type="file"
                    placeholder="add comment image"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    update
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
