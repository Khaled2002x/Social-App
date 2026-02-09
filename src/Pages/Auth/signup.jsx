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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { Context } from "../../Context";
import { useContext } from "react";

export default function signup() {
  const { count, setcount } = useContext(Context);
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
      <div className="main flex flex-col md:flex-row w-full   gap-1  h-screen">
        <section className="hero_login sm:w-full sm:h-1/2 md:w-1/2 md:h-full bg-blue-500  p-5">
          <div className="upperSection flex justify-start   items-center gap-4">
            <div className="left bg-white/30 backdrop-blur-3xl border border-white rounded-[15px] py-3 px-2 w-12.5 ">
              <p className=" font-bold text-white text-center m-0 text-3xl ">
                S
              </p>
            </div>
            <div className="">
              <p className="m-0 text-white text-3xl font-bold">SocialHup</p>
            </div>
          </div>
          <div className="middel_section">
            <div className="middel_section_top">
              <h2 className="text-6xl font-bold text-white">
                Welcome Back <br />
                <span className=" text-cyan-300">to SocialHub App</span>
              </h2>
              <p className="text-white m-0">
                Signin to connect people all over the world
              </p>
              <div className="middel_section_main flex justify-center  items-center  flex-col md:flex-row gap-2">
                <div className="middel_section_main-1 flex items-center gap-3 px-2 py-3 backdrop-blur-3xl bg-white/30 border border-amber-50 rounded-2xl w-full  hover:scale-[1.01] duration-75">
                  <FontAwesomeIcon
                    className="text-emerald-300 bg-white/10 rounded-2xl p-4 backdrop-blur-2xl"
                    icon={faMessage}
                  />
                  <div className="middel_section_text">
                    <p className="text-white font-bold">Real-time Chat</p>
                    <p className="text-white font-bold">Instant messaging</p>
                  </div>
                </div>
                <div className="middel_section_main-1 flex items-center gap-3  px-2 py-3 backdrop-blur-3xl bg-white/30 border border-amber-50 rounded-2xl w-full hover:scale-[1.01] duration-75">
                  <FontAwesomeIcon
                    className="text-emerald-300 bg-white/10 rounded-2xl p-4 backdrop-blur-2xl"
                    icon={faMessage}
                  />
                  <div className="middel_section_text">
                    <p className="text-white font-bold">Real-time Chat</p>
                    <p className="text-white font-bold">Instant messaging</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className=" sm:w-full sm:h-1/2 md:w-1/2 md:h-full   ">
          <form
            onSubmit={handleSubmit(handelsignup)}
            action=""
            className="p-3   m-auto   shadow-2xl w-full md:w-1/2 rounded-2xl "
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
      </div>
    </>
  );
}
