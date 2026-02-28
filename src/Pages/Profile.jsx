import React, { useContext } from "react";
import Addpost from "../Components/post/Addpost";

import { Context } from "../Context";
import Loading from "../Components/post/spinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "../Components/post/Card";
import { useLogout } from "../Components/services/Logout";
export default function Profile() {
  const { User } = useContext(Context);
  if (!User?.data?.user) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { _id, name, email, dateOfBirth, createdAt } = User.data.user;
  async function Getuserpost() {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/users/${_id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  const { data, isLoading } = useQuery({
    queryFn: Getuserpost,
    queryKey: ["userpost"],
  });
  const logout = useLogout();

  return (
    <div>
      {/* component */}
      <div className="w-full flex flex-row flex-wrap">
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: "\n  .round {\n    border-radius: 50%;\n  }\n",
          }}
        />
        <div className="w-full bg-[#F3F4F6] h-screen flex flex-row flex-wrap justify-center ">
          {/* Begin Navbar */}
          <div className="bg-white shadow-lg border-t-4 border-indigo-500 absolute bottom-0 w-full md:w-0 md:hidden flex flex-row flex-wrap">
            <div className="w-full text-right">
              <button className="p-2 fa fa-bars text-4xl text-gray-600" />
            </div>
          </div>
          <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
            <div className="p-5 bg-white sticky top-0">
              <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                Name : {name}
              </div>
              <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                date of birth : {dateOfBirth.split("T")[0]}
              </div>
              <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                email : {email}
              </div>
              <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                createdAt : {createdAt.split("T")[0]}
              </div>
            </div>
            <div
              onClick={logout}
              className="w-full h-screen antialiased flex flex-col hover:cursor-pointer"
            >
              <a
                className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"
                href
              >
                <i className="fa fa-arrow-left text-gray-600 text-2xl pr-1 pt-1 float-right" />
                Log out
              </a>
            </div>
          </div>
          {/* End Navbar */}
          <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
            <Addpost />
            {isLoading ? (
              <Loading />
            ) : (
              <Card details={true} posts={data.data.posts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
