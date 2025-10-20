import { ListMenuUserSetting } from "./ListMenuUserSetting";
import { GrLogout } from "@/assets/icons";
import { FooterLeftbar } from "../Leftbar/FooterLeftbar";
import { Link } from "react-router-dom";
import { menuUserSettings } from "./menuUserSetting";

export const ChildUserSetting = ({ userId, profileImage, username, handleLogout }) => {
  return (
    <>
      <div className="bg-white w-[370px] h-[410px] rounded-lg shadow-xl">
        {/* Card Link To Profile Page */}
        <div className="bg-white w-[90%] mx-auto relative top-3 flex flex-col justify-start items-start rounded-lg shadow-xl">
          <div className="w-[95%] mx-auto pt-2 border-b-[1px] border-slate-400 pb-3 hover:bg-slate-100 hover:rounded-lg">
            <Link to={`/profile/${userId}`} className="flex gap-3 items-center px-2">
              <img src={profileImage} alt="profile" className="rounded-full w-[42px] h-[42px]" />
              <p className="font-semibold">{username}</p>
            </Link>
          </div>
          <div className="p-3 w-[95%] mx-auto hover:bg-slate-100 hover:rounded-lg">
            <a href="#" className="font-semibold text-blue-600 text-md px-2">
              Lihat Semua Profil
            </a>
          </div>
        </div>

        {/* Menu User */}
        <div className="mt-7">
          <ul>
            {menuUserSettings.map((menu, index) => (
              <ListMenuUserSetting key={index} title={menu.title} Icon={menu.Icon} url={"#"} />
            ))}

            {/* Logout Button */}
            <li className="w-[95%] py-1 mx-auto hover:bg-slate-100 hover:rounded-lg">
              <button onClick={handleLogout} className="w-[92%] mx-auto flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="bg-slate-300 h-[35px] w-[35px] flex items-center justify-center rounded-full">
                    <GrLogout className="w-[22px] h-[22px]" />
                  </div>
                  <p className="font-semibold">Keluar</p>
                </div>
              </button>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="px-2">
          <FooterLeftbar />
        </div>
      </div>
    </>
  );
};
