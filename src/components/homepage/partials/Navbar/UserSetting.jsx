/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RiArrowRightSLine, RiChatDownloadFill, MdOutlineDisabledByDefault, GrLogout, AiFillQuestionCircle, FaMoon, FaGear } from '../../../../assets/icons'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Footer } from '../../Leftbar'
import { useAuth } from '../../../../features/auth/useAuth'
import Modal from '../../../../elements/Modal'

export const UserSetting = ({ authUser }) => {
  const { handleLogout } = useAuth()
  const { first_name, surname, profile_image } = authUser
  const [toggleUserSetting, setToggleUserSetting] = useState(false)

  // Image
  const profileImageURL = import.meta.env.VITE_URL_PROFILE_IMAGE
  const username = first_name + ' ' + surname
  const urlProfileImage = profile_image ? `${profileImageURL}/${profile_image}` : '/img/profile-default.jpg'

  const handleToggleUserSetting = () => {
    setToggleUserSetting(!toggleUserSetting)
  }

  return (
    <>
      {/* User Setting */}
      <li className="flex items-center">
        <button onClick={handleToggleUserSetting}>
          <img
            src={urlProfileImage}
            alt=""
            className="h-[42px] w-[42px] rounded-full border border-slate-300"
          />
        </button>
      </li>
      {/* Menu Toggle */}
      <div className="absolute top-[50px]">
        {toggleUserSetting && (
          <ChildUserSetting
            username={username}
            profileImg={urlProfileImage}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </>
  )
}

const ChildUserSetting = ({ username, profileImg, handleLogout }) => {
  const { authUser } = useAuth()

  const ListMenuUserSetting = ({ title, Icon, Arrow, url, onClick }) => {
    return (
      <li className="w-[95%] py-1 mx-auto hover:bg-slate-100 hover:rounded-lg">
        {url ? (
          <Link
            to={url}
            className="w-[92%] mx-auto flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-slate-300 h-[35px] w-[35px] flex items-center justify-center rounded-full">{Icon ? <Icon className="w-[22px] h-[22px]" /> : <MdOutlineDisabledByDefault className="w-[22px] h-[22px]" />}</div>
              <p className="font-semibold">{title}</p>
            </div>
            <div>{Arrow ? <RiArrowRightSLine className="w-[30px] h-[30px]" /> : null}</div>
          </Link>
        ) : (
          <button
            onClick={onClick}
            className="w-[92%] mx-auto flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-slate-300 h-[35px] w-[35px] flex items-center justify-center rounded-full">{Icon ? <Icon className="w-[22px] h-[22px]" /> : <MdOutlineDisabledByDefault className="w-[22px] h-[22px]" />}</div>
              <p className="font-semibold">{title}</p>
            </div>
            <div>{Arrow ? <RiArrowRightSLine className="w-[30px] h-[30px]" /> : null}</div>
          </button>
        )}
      </li>
    )
  }

  return (
    <>
      <div className="bg-white w-[370px] h-[410px] rounded-lg shadow-xl">
        {/* Card Link To Profile Page */}
        <div className="bg-white w-[90%] mx-auto relative top-3 flex flex-col justify-start items-start rounded-lg shadow-xl">
          <div className="w-[95%] mx-auto pt-2 border-b-[1px] border-slate-400 pb-3 hover:bg-slate-100 hover:rounded-lg">
            <Link
              to={`/profile/${authUser.id}`}
              className="flex gap-3 items-center px-2"
            >
              <img
                src={profileImg}
                alt="profile"
                className="rounded-full w-[42px] h-[42px]"
              />
              <p className="font-semibold">{username}</p>
            </Link>
          </div>
          <div className="p-3 w-[95%] mx-auto hover:bg-slate-100 hover:rounded-lg">
            <a
              href="#"
              className="font-semibold text-blue-600 text-md px-2"
            >
              Lihat Semua Profil
            </a>
          </div>
        </div>

        {/* Menu User */}
        <div className="mt-7">
          <ul>
            <ListMenuUserSetting
              title={'Setelan & privasi'}
              Icon={FaGear}
              Arrow={RiArrowRightSLine}
              url={'#'}
            />
            <ListMenuUserSetting
              title={'Bantuan & Dukungan'}
              Icon={AiFillQuestionCircle}
              Arrow={RiArrowRightSLine}
              url={'#'}
            />
            <ListMenuUserSetting
              title={'Tampilan & Aksesibilitas'}
              Icon={FaMoon}
              Arrow={RiArrowRightSLine}
              url={'#'}
            />
            <ListMenuUserSetting
              title={'Beri Masukan'}
              Icon={RiChatDownloadFill}
              url={'#'}
            />

            <ListMenuUserSetting
              title={'Keluar'}
              Icon={GrLogout}
              onClick={handleLogout}
            />
          </ul>
        </div>

        {/* Footer */}
        <div className="px-2">
          <Footer />
        </div>
      </div>
    </>
  )
}
