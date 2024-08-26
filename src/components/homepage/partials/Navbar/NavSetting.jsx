/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { MdOutlineDisabledByDefault } from '../../../../assets/icons'

// Navbar Setting Component
export const NavSetting = ({ Icon }) => {
  return (
    <li className="w-[42px] h-[42px] bg-slate-300 rounded-full">
      <a href="#">{Icon ? <Icon className="h-[27px] w-[27px] text-black ml-2 mt-2" /> : <MdOutlineDisabledByDefault className="h-[27px] w-[27px] text-black ml-2 mt-2" />}</a>
    </li>
  )
}
