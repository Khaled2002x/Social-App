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
export default function signup() {
  const [sucess, setsucsess] = useState(false);
  const [faildata, setfail] = useState(false);
  const [loading, setloading] = useState(false);

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
        .min(10, "enter at least 10 string"),
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
        "https://linked-posts.routemisr.com/users/signup",
        dataForm,
        { headers: { "Content-Type": "application/json" } },
      );
      setfail(false);
      setsucsess(true);
      setloading(false);
      console.log(data);
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
          onSubmit={handleSubmit(handelsignup)}
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

          <div className="text-5xl text-center ">Sign Up</div>
          <div className="main_form p-5 flex flex-col gap-4">
            <Input
              label="name"
              type="text"
              {...register("name")}
              variant="underlined"
            ></Input>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

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
            <Input
              label="rePassword"
              type="password"
              {...register("rePassword")}
              variant="underlined"
            ></Input>
            {errors.rePassword && (
              <p className="text-red-500">{errors.rePassword.message}</p>
            )}
            <Input
              {...register("dateOfBirth")}
              variant="underlined"
              label={"Birthdate"}
              type="date"
            ></Input>
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
            )}

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  label={"gender"}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Radio value={"male"}>male</Radio>
                  <Radio value={"female"}>female</Radio>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className="text-red-500"> {errors.gender.message} </p>
            )}

            <Button
              isLoading={loading}
              type="submit"
              className="bg-blue-500 active:scale-50 transition-all duration-75 text-white p-3 rounded-lg w-full mt-5"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
