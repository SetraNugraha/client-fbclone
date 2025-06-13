/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MdOutlineDisabledByDefault,
  MdOutlineKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdNewspaper,
  IoPeopleCircleOutline,
  IoStorefrontOutline,
  BsPeople,
  FaEarthAmericas,
  HiMiniRectangleGroup,
  AiFillFlag,
  SiMessenger,
  BiSolidJoystickAlt,
  ImStatsBars,
  RiYoutubeLine,
  GiBackwardTime,
  IoBookmarkOutline,
  LiaIdCardSolid,
  FaRegHeart,
  IoCalendarNumberOutline,
} from "../../assets/icons";

import { useState, useEffect } from "react";

// User Profile Component
const Profile = ({ username, profileImg = "img/profile-default.jpg" }) => {
  return (
    <div className="py-2 px-3">
      <a href="#" className="flex justify-start items-center gap-3 ">
        <img
          src={profileImg}
          alt=""
          className="w-[30px] h-[30px] rounded-full"
        />
        <p className="font-semibold text-md">{username}</p>
      </a>
    </div>
  );
};

// Left Menu Component
const LeftMenu = ({ title, Icon }) => {
  return (
    <li className="py-2 px-3 rounded-xl hover:bg-gray-300">
      <a href="#" className="flex justify-start items-center gap-3 ">
        {Icon ? (
          <Icon className="h-[30px] w-[30px]" />
        ) : (
          <MdOutlineDisabledByDefault className="h-[30px] w-[30px]" />
        )}
        <p className="font-semibold text-md">{title}</p>
      </a>
    </li>
  );
};

// Button Expand Leftmenu Component
const ExpandLeftMenu = ({ Icon, children }) => {
  const [expandMenu, setExpandMenu] = useState(() => {
    // Get Data expandMenu from localstorage
    const storedValue = localStorage.getItem("expandMenu");
    // validation what value of expandMenu
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Set ExpandMenu
  const handleExpandMenu = () => {
    setExpandMenu(!expandMenu);
  };

  useEffect(() => {
    localStorage.setItem("expandMenu", JSON.stringify(expandMenu));
  }, [expandMenu]);

  return (
    <>
      {/* Jika expandMenu TRUE dan terdapat children pada component ExpandMenuLeft */}
      {expandMenu && children ? (
        <div className="transition-all duration-500 ease-in-out">
          {children}
        </div>
      ) : null}

      {/* Button To Expand Menu*/}
      <li className="py-2 px-3 rounded-xl hover:bg-gray-300">
        <button
          onClick={handleExpandMenu}
          className="flex justify-start items-center gap-3 w-full"
        >
          {Icon && expandMenu ? (
            <MdOutlineKeyboardArrowUp className="h-[30px] w-[30px] bg-slate-300 rounded-full" />
          ) : (
            <MdKeyboardArrowDown className="h-[30px] w-[30px] bg-slate-300 rounded-full" />
          )}
          <p className="font-semibold text-md">
            {expandMenu ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
          </p>
        </button>
      </li>
    </>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <div className="my-2 px-5">
      <p className="text-xs">
        Privasi . Ketentuan . Pilihan Iklan . Cookie . Lainnya .{" "}
      </p>
      <p className="text-xs">Meta &copy; 2024</p>
    </div>
  );
};

export default function Leftbar({ authUser }) {
  const username = authUser.first_name + " " + authUser.surname;
  const profileImage = authUser.profile_image;
  const URL_PORFILE_IMAGE = import.meta.env.VITE_URL_PROFILE_IMAGE;
  const urlProfileImageUserLogin = profileImage
    ? `${URL_PORFILE_IMAGE}/${profileImage}`
    : "img/profile-default.jpg";

  return (
    <div className="fixed h-[90%] w-[22%] mt-[-10px] overflow-y-auto scrollbar-hide">
      <div className=" h-full flex flex-col justify-between">
        {/* Menu */}
        <div className="px-3 flex flex-col gap-1">
          <div className="rounded-xl hover:bg-gray-300">
            <Profile
              username={`${username ? username : "unknown"}`}
              profileImg={urlProfileImageUserLogin}
            />
          </div>

          <div>
            <ul>
              <LeftMenu title={"Cari Teman"} Icon={BsPeople} />
              <LeftMenu title={"Kenangan"} Icon={GiBackwardTime} />
              <LeftMenu title={"Tersimpan"} Icon={IoBookmarkOutline} />
              <LeftMenu title={"Grup"} Icon={IoPeopleCircleOutline} />
              <LeftMenu title={"Video"} Icon={RiYoutubeLine} />
              <LeftMenu title={"Marketplace"} Icon={IoStorefrontOutline} />
              <LeftMenu title={"Kabar"} Icon={LiaIdCardSolid} />
              <LeftMenu title={"Acara"} Icon={IoCalendarNumberOutline} />
              <LeftMenu title={"Pengelola Iklan"} Icon={ImStatsBars} />
              <LeftMenu title={"Penggalangan Dana"} Icon={FaRegHeart} />
              <ExpandLeftMenu Icon={MdKeyboardArrowDown}>
                {/* children */}
                <LeftMenu
                  title={"Aktivitas Iklan Terkini"}
                  Icon={MdNewspaper}
                />
                <LeftMenu title={"Halaman"} Icon={AiFillFlag} />
                <LeftMenu title={"Mainkan Game"} Icon={BiSolidJoystickAlt} />
                <LeftMenu title={"Messenger"} Icon={SiMessenger} />
                <LeftMenu title={"Messenger Anak"} Icon={SiMessenger} />
                <LeftMenu
                  title={"Pusat Info Perubahan Iklim"}
                  Icon={FaEarthAmericas}
                />
                <LeftMenu title={"Video Game"} Icon={HiMiniRectangleGroup} />
              </ExpandLeftMenu>
            </ul>
          </div>
        </div>

        {/* Copyrigth */}
        <Footer />
      </div>
    </div>
  );
}
