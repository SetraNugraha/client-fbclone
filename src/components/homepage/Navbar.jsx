/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoStorefrontOutline, IoPeopleCircleOutline, IoChatbubbleEllipses, RiYoutubeLine, FaFacebook, FaBell, CgMenuGridO, BsPeople, GoHomeFill } from '../../assets/icons'

import { NavLogo } from './partials/Navbar/NavLogo'
import { NavMenu } from './partials/Navbar/NavMenu'
import { NavSetting } from './partials/Navbar/NavSetting'
import { UserSetting } from './partials/Navbar/UserSetting'
import { useAuth } from '../../features/auth/useAuth'

export default function Navbar() {
  const { authUser } = useAuth()
  return (
    <>
      <div className="fixed h-[57px] w-full bg-slate-100 drop-shadow-lg flex justify-between items-center z-10">
        {/* Logo & Search */}
        <div className="w-[23%] h-full flex gap-3 items-center">
          <NavLogo Icon={FaFacebook} />
        </div>
        {/* End Logo & Search */}

        {/* Menu Bar */}
        <div className="w-1/3">
          <ul className="flex items-center justify-around">
            <NavMenu
              Icon={GoHomeFill}
              url="/homepage"
            />
            <NavMenu Icon={BsPeople} />
            <NavMenu Icon={RiYoutubeLine} />
            <NavMenu Icon={IoStorefrontOutline} />
            <NavMenu Icon={IoPeopleCircleOutline} />
          </ul>
        </div>
        {/* End Menu Bar */}

        {/* Setting */}
        <div className="w-1/4">
          <ul className=" flex justify-end items-center gap-3 mr-5">
            <NavSetting Icon={CgMenuGridO} />
            <NavSetting Icon={IoChatbubbleEllipses} />
            <NavSetting Icon={FaBell} />
            <UserSetting authUser={authUser} />
          </ul>
        </div>

        {/* End Setting */}
      </div>
    </>
  )
}
