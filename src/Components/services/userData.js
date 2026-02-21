import axios from "axios";
import React from "react";

export default async function UserData() {
  const { data } = await axios.get(
    "https://route-posts.routemisr.com/users/profile-data",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  return data.data;
}
