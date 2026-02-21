import { Link } from "react-router-dom";
import Commet from "./Commet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@heroui/react";
import { IoSendSharp } from "react-icons/io5";
import { MdInsertPhoto } from "react-icons/md";
export default function Card({ posts, details = false }) {
  function GetFullYear(value) {
    const date = new Date(value);
    return date.getFullYear();
  }

  return (
    <>
      <div>
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-100 min-h-screen p-3 flex items-center justify-center"
          >
            <div className="bg-white w-100 p-8 rounded-lg shadow-md max-w-md">
              {/* User Info with Three-Dot Menu */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.user.photo}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {post.user.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {GetFullYear(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              {/* Message */}
              <div className="mb-4">
                <p className="text-gray-800">{post.body} </p>
              </div>
              {/* Image */}
              <div className="mb-4">
                <img
                  src={post.image}
                  alt="Post Image"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              {/* Like and Comment Section */}
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-2"></div>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                      />
                    </g>
                  </svg>
                  <span>{post.commentsCount}</span>
                </button>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-semibold">Comment</p>
                <Link className="text-blue-400" to={`/post/${post._id}`}>
                  {details ? "" : <p>view all comments</p>}
                </Link>
              </div>

              <hr className="mt-2 mb-2" />
              <div className="mt-4">
                {/* Comment 1 */}

                {/* Reply from John Doe with indentation */}
                <Commet post={post} details={details} />

                {/* Add more comments and replies as needed */}
              </div>
            </div>
          </div>
        ))}
        {/* component */}
      </div>
    </>
  );
}
