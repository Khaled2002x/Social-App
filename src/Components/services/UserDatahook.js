import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserData from "./userData";

export const User = () => {
  return useQuery({
    queryFn: UserData,
    queryKey: ["user"],
    enabled: !!localStorage.getItem("token"),
  });
};
