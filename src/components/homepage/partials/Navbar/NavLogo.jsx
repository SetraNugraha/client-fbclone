/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdOutlineDisabledByDefault } from '../../../../assets/icons'
import { Link } from 'react-router-dom'

export const NavLogo = ({ Icon }) => {
  return (
    <>
      <Link
        to={'/homepage'}
        className="ml-5"
      >
        {Icon ? <Icon className="h-[40px] w-[40px] text-blue-500" /> : <MdOutlineDisabledByDefault className="h-[40px] w-[40px] text-blue-500" />}
      </Link>
      <input
        type="text"
        className="w-[60%] h-[70%] rounded-full bg-slate-200 px-5 placeholder:text-slate-600 placeholder:text-lg border-[1px] focus:outline-none focus:border-blue-600"
        placeholder="Cari Di Facebook"
      />
    </>
  )
}
