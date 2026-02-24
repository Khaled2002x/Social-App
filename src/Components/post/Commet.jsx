import CommentDetails from "./CommentDetails";
import src from "../../assets/images/user.jpeg";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddComment from "./AddComment";
export default function Commet({ post, details }) {
  return (
    <div className="">
      <AddComment post={post} />
      {!details && post.topComment ? (
        <div className="flex items-center space-x-2">
          <img
            src={
              post.topComment?.commentCreator?.photo
                ? post.topComment?.commentCreator?.photo
                : src
            }
            alt={post.topComment?.commentCreator?.name}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">
              {post.topComment?.commentCreator?.name}
            </p>
            <p className="text-gray-500 text-sm">{post.topComment?.content}</p>
          </div>
        </div>
      ) : (
        <p> </p>
      )}
      {details && (
        <>
          <CommentDetails post={post} details={details} />
        </>
      )}
    </div>
  );
}
