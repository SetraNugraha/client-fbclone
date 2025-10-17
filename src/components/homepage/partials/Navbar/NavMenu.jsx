/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { MdOutlineDisabledByDefault } from '../../../../assets/icons'

export const NavMenu = ({ Icon, url = '#' }) => {
  return (
    <li>
      <Link to={url}>{Icon ? <Icon className="h-[30px] w-[30px] text-slate-600 hover:text-blue-500" /> : <MdOutlineDisabledByDefault className="h-[30px] w-[30px] text-slate-600" />}</Link>
    </li>
  )
}
