import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  spinner,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdInsertPhoto } from "react-icons/md";
import Loading from "./spinner";

export default function Modeladdcomment({ comment, postid }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const Inputfile = useRef();
  const [image, setimage] = useState(null);
  const { register, setValue, reset, handleSubmit } = useForm({
    defaultValues: {
      content: "",
    },
  });
  function handelimage(e) {
    console.log(e.target.files[0]);

    setimage(e.target.files[0]);
  }
  async function Handelupdatecommentform(formdata) {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postid}/comments/${comment._id}`,
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
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: Handelupdatecommentform,
    mutationKey: ["comment"],
    onSuccess: () => {
      reset();
      queryclient.invalidateQueries({
        queryKey: ["comment"],
      });
      queryclient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
  function Update(dataform) {
    const formdata = new FormData();
    formdata.append("content", dataform.content);
    formdata.append("image", image);
    mutate(formdata);
  }
  useEffect(() => {
    if (isOpen && comment) {
      setValue("content", comment.content);
    }
  }, [isOpen, comment, setValue]);
  return (
    <>
      <Button onPress={onOpen}>Update</Button>
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
                Update comment
              </ModalHeader>
              <form onSubmit={handleSubmit(Update)}>
                <ModalBody>
                  <Input
                    {...register("content")}
                    type="text"
                    placeholder="update your comment"
                  />
                  <Button onClick={() => Inputfile.current.click()}>
                    <MdInsertPhoto className="size-9" />
                    Upload comment image
                  </Button>

                  <Input
                    ref={Inputfile}
                    onChange={handelimage}
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
                  <Button
                    isPending={isPending}
                    type="submit"
                    color="primary"
                    onPress={onClose}
                  >
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
