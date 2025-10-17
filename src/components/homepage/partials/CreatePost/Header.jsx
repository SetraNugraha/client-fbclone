/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoPeopleSharp, VscTriangleDown } from "../../../../assets/icons";

export const Header = ({ authUser }) => {
  const username = authUser.first_name + " " + authUser.surname;
  const profileImage = authUser.profile_image;
  const URL_PORFILE_IMAGE = import.meta.env.VITE_URL_PROFILE_IMAGE;
  const urlProfileImageUserLogin = profileImage
    ? `${URL_PORFILE_IMAGE}/${profileImage}`
    : "/img/profile-default.jpg";
  return (
    <div className="flex gap-x-3 items-center mt-3">
      <img
        src={urlProfileImageUserLogin}
        alt="profile_picture"
        className="w-[43px] h-[43px] rounded-full border border-slate-300"
      />
      <div>
        <p className="font-semibold">{username}</p>
        <button
          type="button"
          className="bg-slate-200 px-2 font-semibold flex items-center gap-x-1 rounded-lg"
        >
          <i>
            <IoPeopleSharp />
          </i>
          Friends
          <i>
            <VscTriangleDown />
          </i>
        </button>
      </div>
    </div>
  );
};
