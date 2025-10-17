import { MdOutlineDisabledByDefault } from "react-icons/md";

export const LeftMenu = ({ title, Icon }) => {
  return (
    <li className="py-2 px-3 rounded-xl hover:bg-gray-300">
      <a href="#" className="flex justify-start items-center gap-3 ">
        {Icon ? <Icon className="h-[30px] w-[30px]" /> : <MdOutlineDisabledByDefault className="h-[30px] w-[30px]" />}
        <p className="font-semibold text-md">{title}</p>
      </a>
    </li>
  );
};
