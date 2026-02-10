import React, { useState } from "react";
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../zod-validation";
import axios from "axios";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/react";
import { replace, useNavigate } from "react-router-dom";

export default function signin() {
  const Navigate = useNavigate();
  const [sucess, setsucsess] = useState(false);
  const [faildata, setfail] = useState(false);
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  async function handellogin(dataform) {
    setloading(true);
    setfail(false);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        dataform,
      );
      localStorage.setItem("token", data.token);

      setloading(false);
      setsucsess(true);
      console.log(data);
      Navigate("/home", replace("/"));
    } catch (error) {
      setfail(true);
      setsucsess(false);
      setloading(false);
      console.log(error);
    }
  }
  return (
    <>
      <div className=" flex justify-center items-center h-screen p-5 ">
        <form
          onSubmit={handleSubmit(handellogin)}
          action=""
          className="p-3 bg-white m-auto   w-full md:w-1/2 rounded-2xl "
        >
          {faildata ? (
            <Alert className="bg-danger text-white">
              plaese enter valid data
            </Alert>
          ) : null}
          {sucess ? (
            <Alert className="bg-success text-white">login successfuly</Alert>
          ) : null}

          <div className="text-5xl text-center ">Login</div>
          <div className="main_form p-5 flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              {...register("email")}
              variant="underlined"
            ></Input>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              label="Password"
              type="password"
              {...register("password")}
              variant="underlined"
            ></Input>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <Button
              isLoading={loading}
              type="submit"
              className="bg-blue-500 active:scale-50 transition-all duration-75 text-white p-3 rounded-lg w-full mt-5"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
