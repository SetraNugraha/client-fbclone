import { CardComment } from "./CardComment";
import { Link } from "react-router-dom";
import { BsThreeDots } from "../../../../../assets/icons";
import { formatDate } from "../../../../../utils/formatDate";

export const RecentComments = ({ user, comment }) => {
  const userProfileImage = comment.user?.profile_image ? IMAGE_URL + comment.user?.profile_image : "img/profile-default.jpg";

  return (
    <div className="flex gap-1 py-2 px-5">
      {/* Profile Image */}
      <div className="w-[35px] h-[35px] mt-[-23px]">
        <Link to={`/profile/${user.id}`} className="ml-10">
          <img src={userProfileImage} alt="profile-image" className="h-full w-full rounded-full" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        {/* User & Comment User */}
        <div className="flex items-center gap-1">
          <CardComment user={user} bodyComment={comment.body} />

          {/* Option Button Comment */}
          <button className="hover:bg-slate-100 flex items-center justify-center h-[35px] w-[35px] rounded-full">
            <BsThreeDots />
          </button>
        </div>
        {/* Time & Like, Comment  */}
        <div className="flex items-center gap-x-5 mx-5">
          <p className="text-slate-500">{formatDate(comment.created_at)}</p>
          <button className="font-bold text-md text-slate-500">Suka</button>
          <button className="font-bold text-md text-slate-500">Balas</button>
        </div>
      </div>
    </div>
  );
};
