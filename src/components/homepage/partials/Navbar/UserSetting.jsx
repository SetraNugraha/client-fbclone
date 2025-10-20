/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChildUserSetting } from "./ChildUserSetting";
import { getProfilePicture } from "../../../../utils/getProfilePicture";

export const UserSetting = ({ authUser }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const username = authUser.first_name + " " + authUser.surname ?? "unknown";
  const profilePicture = getProfilePicture(authUser?.profile_image);

  const [toggleUserSetting, setToggleUserSetting] = useState(false);

  const handleToggleUserSetting = () => {
    setToggleUserSetting(!toggleUserSetting);
  };

  const handleLogout = () => {
    const isConfirm = confirm("are you sure want to logout ?");

    if (isConfirm) {
      logout.mutate({
        onSuccess: () => {
          navigate("/");
        },
      });
    } else {
      alert("logout cancelled");
    }
  };

  return (
    <>
      {/* User Setting */}
      <li className="flex items-center">
        <button onClick={handleToggleUserSetting}>
          <img src={profilePicture} alt="profile-image" className="h-[42px] w-[42px] rounded-full border border-slate-300" />
        </button>
      </li>
      {/* Menu Toggle */}
      <div className="absolute top-[50px]">
        {toggleUserSetting && <ChildUserSetting userId={authUser.id} profileImage={profilePicture} username={username} handleLogout={handleLogout} />}
      </div>
    </>
  );
};
