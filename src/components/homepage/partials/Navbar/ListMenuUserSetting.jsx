import { Link } from "react-router-dom";
import { RiArrowRightSLine, MdOutlineDisabledByDefault } from "@/assets/icons";

export const ListMenuUserSetting = ({ title, Icon, url }) => {
  return (
    <li className="w-[95%] py-1 mx-auto hover:bg-slate-100 hover:rounded-lg">
      <Link to={url} className="w-[92%] mx-auto flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="bg-slate-300 h-[35px] w-[35px] flex items-center justify-center rounded-full">
            {Icon ? <Icon className="w-[22px] h-[22px]" /> : <MdOutlineDisabledByDefault className="w-[22px] h-[22px]" />}
          </div>
          <p className="font-semibold">{title}</p>
        </div>
        <RiArrowRightSLine className="w-[30px] h-[30px]" />
      </Link>
    </li>
  );
};
