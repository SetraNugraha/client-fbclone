/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChildUserSetting } from "./ChildUserSetting";
import { ProfilePicture } from "@/elements/ProfilePicture";

export const UserSetting = ({ authUser }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
          <ProfilePicture user={authUser} size={42} />
        </button>
      </li>
      {/* Menu Toggle */}
      <div className="absolute top-[50px]">{toggleUserSetting && <ChildUserSetting authUser={authUser} handleLogout={handleLogout} />}</div>
    </>
  );
};
