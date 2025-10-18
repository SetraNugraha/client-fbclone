import { useState, useEffect } from "react";
import { FaBookOpen, CgClapperBoard } from "../../../../assets/icons";

const HeaderReelsMenu = [
  {
    title: "Cerita",
    Icon: FaBookOpen,
  },
  {
    title: "Reels",
    Icon: CgClapperBoard,
  },
];

export const HeaderReels = () => {
  const [activeMenuReels, setActiveMenuReels] = useState(() => {
    const storageValue = localStorage.getItem("activeMenuReels");
    return storageValue ? JSON.parse(storageValue) : "Cerita";
  });

  useEffect(() => {
    localStorage.setItem("activeMenuReels", JSON.stringify(activeMenuReels));
  }, [activeMenuReels]);

  return HeaderReelsMenu.map((menu, index) => (
    <li
      key={index}
      className={`h-full w-full flex justify-center items-center ${
        menu.title === activeMenuReels ? " border-b-[3px] border-blue-500" : "border-b-[2px] border-slate-400"
      } `}
    >
      <button onClick={() => setActiveMenuReels(menu.title)} className="flex gap-2 justify-center items-center">
        <menu.Icon className={`h-[25px] w-[25px] ${menu.title === activeMenuReels ? "text-blue-500" : "text-slate-500"}`} />
        <p className={`font-semibold ${menu.title === activeMenuReels ? "text-blue-500" : "text-slate-500"}`}>{menu.title}</p>
      </button>
    </li>
  ));
};
