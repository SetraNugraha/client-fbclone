/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDots, IoClose } from "../../../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "../../../../utils/formatDate";
import { ProfilePicture } from "../../../../elements/ProfilePicture";
import { useEffect } from "react";

export const HeaderPost = ({ author, post }) => {
  const { authUser } = useAuth();

  return (
    <div className="flex justify-between items center px-3 py-2">
      {/* Profile */}
      <div className="flex items-center gap-x-3">
        <ProfilePicture user={author} size={35} />
        <Link to={`/profile/${author?.id}`}>
          <p className="font-semibold text-sm">{author?.username || "unknown"}</p>
          <p className="text-xs">{formatDate(post?.created_at)}</p>
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
          {author?.id === authUser.id && (
            <button className="text-slate-500 cursor-pointer p-1 hover:rounded-full hover:bg-slate-300">
              <IoClose className="font-bold size-5 " />
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};
