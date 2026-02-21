import React, { useState } from "react";
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../zod-validation";
import axios from "axios";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/react";
import { Link, replace, useNavigate } from "react-router-dom";
import HeroAuth from "./heroAuth";
import Navbarjsx from "../../Components/layout/navbar";
import { Context } from "../../Context";
import { useContext } from "react";

export default function signin() {
  const Navigate = useNavigate();
  const [sucess, setsucsess] = useState(false);
  const [faildata, setfail] = useState(false);
  const [loading, setloading] = useState(false);
  const { SetToken } = useContext(Context);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  async function handellogin(dataform) {
    setloading(true);
    setfail(false);
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        dataform,
      );
      localStorage.setItem("token", data.data.token);
      SetToken(data.data.token);
      setloading(false);
      setsucsess(true);
      console.log(data);
      reset();
      Navigate("/", replace("/"));
    } catch (error) {
      setfail(true);
      setsucsess(false);
      setloading(false);
      console.log(error);
    }
  }
  return (
    <>
      <div className="main flex flex-col md:flex-row w-full gap-1 h-screen">
        <HeroAuth />
        <div className=" sm:w-full  md:w-1/2 md:h-full flex items-center">
          <form
            onSubmit={handleSubmit(handellogin)}
            action=""
            className="p-3 bg-white/50 shadow-2xl border-1.5 border-gray-300 md:w-3/4  m-auto   w-full md:w-1/2 rounded-2xl  "
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
            <Link className="" to={"/auth/signup"}>
              <p className=" text-center mt-2">
                Don't have an account? <span className="link">Sign up</span>
              </p>
            </Link>
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
      </div>
    </>
  );
}
