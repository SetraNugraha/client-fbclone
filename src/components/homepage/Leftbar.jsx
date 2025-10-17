/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "../../assets/icons";

import { useState, useEffect } from "react";
import { LeftMenu } from "./partials/Leftbar/LeftMenu";
import { menus } from "./partials/Leftbar/menus";
import { Profile } from "./partials/Leftbar/Profile";
import { FooterLeftbar } from "./partials/Leftbar/FooterLeftbar";

export default function Leftbar({ authUser }) {
  const username = authUser.first_name + " " + authUser.surname;
  const profileImage = authUser.profile_image;
  const URL_PORFILE_IMAGE = import.meta.env.VITE_URL_PROFILE_IMAGE;
  const urlProfileImageUserLogin = profileImage ? `${URL_PORFILE_IMAGE}/${profileImage}` : "img/profile-default.jpg";

  const [expandMenu, setExpandMenu] = useState(() => {
    const storageValue = localStorage.getItem("expandMenuLeft");
    return storageValue ? JSON.parse(storageValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("expandMenuLeft", JSON.stringify(expandMenu));
  }, [expandMenu]);

  return (
    <div className="fixed h-[90%] w-[22%] mt-[-10px] overflow-y-auto scrollbar-hide">
      <div className=" h-full flex flex-col justify-between">
        {/* Menu */}
        <div className="px-3 flex flex-col gap-1">
          <div className="rounded-xl hover:bg-gray-300">
            <Profile username={`${username ? username : "unknown"}`} profileImg={urlProfileImageUserLogin} />
          </div>

          <div>
            <ul>
              {(expandMenu ? menus : menus.slice(0, 10)).map((menu, index) => (
                <LeftMenu key={index} title={menu.title} Icon={menu.icon} />
              ))}
              <li className="py-2 px-3 rounded-xl hover:bg-gray-300">
                <button onClick={() => setExpandMenu(!expandMenu)} className="flex justify-start items-center gap-3 w-full">
                  {expandMenu ? (
                    <MdOutlineKeyboardArrowUp className="h-[30px] w-[30px] bg-slate-300 rounded-full" />
                  ) : (
                    <MdKeyboardArrowDown className="h-[30px] w-[30px] bg-slate-300 rounded-full" />
                  )}
                  <p className="font-semibold text-md">{expandMenu ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}</p>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyrigth */}
        <FooterLeftbar />
      </div>
    </div>
  );
}
