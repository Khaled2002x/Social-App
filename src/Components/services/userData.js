import axios from "axios";
import React from "react";

export default async function UserData() {
  const { data } = await axios.get(
    "https://linked-posts.routemisr.com/users/profile-data",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data.user;
}
