import React from "react";
import { useForm } from "react-hook-form";
import z, { email } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, Radio } from "@heroui/radio";
import { Controller } from "react-hook-form";
import { Alert } from "@heroui/alert";
import { useState } from "react";
import { Input } from "@heroui/react";
import axios from "axios";
import { Button } from "@heroui/react";
import HeroAuth from "./heroAuth";
import { Context } from "../../Context";
import { useContext } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router-dom";

export default function signup() {
  const { count, token, setcount } = useContext(Context);
  const [sucess, setsucsess] = useState(false);
  const [faildata, setfail] = useState(false);
  const [loading, setloading] = useState(false);
  const navtologin = useNavigate();
  const signupschema = z
    .object({
      name: z
        .string()
        .nonempty("name is requiered")
        .min(2, "please enter first and socend name"),
      email: z
        .string()
        .nonempty("email is requiered")
        .email("please enter valid email"),
      password: z
        .string()
        .nonempty("please enter password")

        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
        ),
      rePassword: z.string().nonempty("please re enter password"),
      gender: z.string().nonempty("please choose your gender"),
      dateOfBirth: z
        .string()
        .nonempty("please enter your birth date ")

        .refine(
          (birthdate) => {
            const userDate = new Date(birthdate);
            const currentDate = new Date();
            return currentDate.getFullYear() - userDate.getFullYear() >= 18;
          },
          {
            message: "your age must be >=18 ",
          },
        ),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "repassword not equal password ",
      path: ["rePassword"],
    });
  let {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupschema),
    mode: "onChange",
    defaultValues: {
      gender: "",
    },
  });
  async function handelsignup(dataForm) {
    try {
      setloading(true);
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        dataForm,
        { headers: { "Content-Type": "application/json" } },
      );
      setfail(false);
      setsucsess(true);
      reset();
      setloading(false);
      navtologin("/auth/signin", replace);
      console.log(data);
    } catch (error) {
      setfail(true);
      setsucsess(false);
      setloading(false);
      console.log(error.data.message);
    }
  }

  return (
    <>
      <div className="main flex flex-col md:flex-row w-full gap-1 h-screen">
        <HeroAuth />

        {/* FORM */}
        <div className="sm:w-full  md:w-1/2 md:h-full flex items-center">
          <form
            onSubmit={handleSubmit(handelsignup)}
            className="p-5 m-auto shadow-2xl w-full md:w-4/5 rounded-2xl bg-white/50"
          >
            {faildata && (
              <Alert className="bg-danger text-white text-sm sm:text-base">
                plaese enter valid data
              </Alert>
            )}
            {sucess && (
              <Alert className="bg-success text-white text-sm sm:text-base">
                signup successfuly
              </Alert>
            )}

            <div className="text-3xl sm:text-4xl md:text-5xl text-center mb-6">
              Sign Up
            </div>
            <Link to={"/auth/signin"}>
              <p className="text-center">
                Already have an account? <span className="link">Sign in</span>
              </p>
            </Link>

            <div className="flex flex-col gap-4">
              <div className=" grid grid-cols-2 gap-8">
                <div className="">
                  <Input
                    label="name"
                    {...register("name")}
                    variant="underlined"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Input
                    label="Email"
                    {...register("email")}
                    variant="underlined"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="">
                  <Input
                    label="Password"
                    type="password"
                    {...register("password")}
                    variant="underlined"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Input
                    label="rePassword"
                    type="password"
                    {...register("rePassword")}
                    variant="underlined"
                  />
                  {errors.rePassword && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.rePassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Input
                label="Birthdate"
                type="date"
                {...register("dateOfBirth")}
                variant="underlined"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500">{errors.dateOfBirth.message}</p>
              )}

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} label="gender">
                    <Radio value="male">male</Radio>
                    <Radio value="female">female</Radio>
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
              <Button
                isLoading={loading}
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg w-full mt-5"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
