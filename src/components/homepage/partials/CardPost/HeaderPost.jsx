/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDots, IoClose } from "../../../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../features/auth/useAuth";
import { formatDate } from "../../../../utils/formatDate";
import { ProfilePicture } from "../../../../elements/ProfilePicture";

export const HeaderPost = ({ post }) => {
  const { authUser } = useAuth();

  return (
    <div className="flex justify-between items center px-3 py-2">
      {/* Profile */}
      <div className="flex items-center gap-x-3">
        <ProfilePicture user={post?.author} size={35} />
        <Link to={`/profile/${post.author?.id}`}>
          <p className="font-semibold text-sm">{post.author?.username}</p>
          <p className="text-xs">{formatDate(post.created_at)}</p>
        </Link>
      </div>

      {/* Option */}
      <div>
        <ul className="flex justify-center items-center gap-x-2">
          {/* option */}
          <li className="cursor-pointer p-1 hover:rounded-full hover:bg-slate-300">
            <BsThreeDots className="font-bold size-5 text-slate-500" />
          </li>
          {/* Delete */}
          {post.author.id === authUser.id && (
            <button className="text-slate-500 cursor-pointer p-1 hover:rounded-full hover:bg-slate-300">
              <IoClose className="font-bold size-5 " />
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};
