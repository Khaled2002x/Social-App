import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import src from "../../src/assets/images/user.jpeg";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { useLogout } from "../Components/services/Logout";
// .regex(
//           /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//           "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
//         ),
export default function Changepassword() {
  const logout = useLogout();
  const changePasswordSchema = z.object({
    password: z.string().nonempty("please enter your current password"),
    newPassword: z
      .string()
      .nonempty("please enter new password")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  async function sendData(formData) {
    const { data } = await axios.patch(
      `https://route-posts.routemisr.com/users/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  const Navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      logout();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function resetpasword(data) {
    console.log(data);
    mutate(data);
  }

  return (
    <div>
      {/* component */}
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex items-center space-x-2 mb-6">
            <img
              src={src}
              alt="Lock Icon"
              className="rounded-full size-[50px]"
            />
            <h1 className="text-xl font-semibold">Change Password</h1>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Update password for enhanced account security.
          </p>
          <form
            id="changePasswordForm"
            onSubmit={handleSubmit(resetpasword)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Current Password *
              </label>
              <input
                {...register("password")}
                type="password"
                id="currentPassword"
                className="password-input p-2 form-input block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                New Password *
              </label>
              <input
                {...register("newPassword")}
                type="password"
                id="newPassword"
                className="password-input p-2 form-input block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="w-full ">
              <Button
                isLoading={isPending}
                type="submit"
                className=" w-full text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Apply Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
