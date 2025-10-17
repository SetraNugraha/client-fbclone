/* eslint-disable react/prop-types */
import { FaBookOpen, CgClapperBoard, MdOutlineDisabledByDefault } from '../../assets/icons'

import { useState, useEffect } from 'react'

// Header Reels Component
const HeaderReels = ({ title, Icon, activeMenu, handleMenuClick }) => {
  return (
    <>
      <li className={`h-full w-full flex justify-center items-center ${activeMenu === title ? ' border-b-[3px] border-blue-500' : 'border-b-[2px] border-slate-400'} `}>
        <button
          onClick={() => handleMenuClick(title)}
          className="flex gap-2 justify-center items-center"
        >
          {Icon ? <Icon className={`h-[25px] w-[25px] ${activeMenu === title ? 'text-blue-500' : 'text-slate-500'}`} /> : <MdOutlineDisabledByDefault className="h-[25px] w-[25px] text-blue-500" />}
          <p className={`font-semibold ${activeMenu === title ? 'text-blue-500' : 'text-slate-500'}`}>{title}</p>
        </button>
      </li>
    </>
  )
}

// Create Reels Component
const CreateReels = ({ profileImage }) => {
  return (
    <>
      <a
        href="#"
        className="h-full flex flex-col justify-between"
      >
        {/* Background Image Profile User */}
        <img
          src={profileImage}
          alt=""
          className="rounded-t-xl h-[75%]"
        />
        {/* Circle Plus */}
        <div className="flex justify-center mt-[-35px]">
          <div className="bg-blue-600 border-2 border-white h-[18%] w-[28%] rounded-full flex justify-center items-center absolute">
            <p className="text-white text-3xl font-semibold pb-1">+</p>
          </div>
        </div>
        {/* Text Add Story */}
        <p className="bg-white flex font-semibold text-sm pb-1 justify-center items-end rounded-b-xl h-[25%]">Buat Cerita</p>
      </a>
    </>
  )
}

// Reels List Component
const ReelsList = ({ username, userProfileImage, userReelsImage }) => {
  return (
    <>
      <li className="relative cursor-pointer hover:opacity-80">
        {/* Image Profile */}
        <div className="absolute inset-0 flex items-start justify-start py-3 px-3 ">
          <a href="#">
            <img
              src={userProfileImage}
              alt=""
              width={'38px'}
              height={'38px'}
              className="rounded-full border-4 border-blue-600"
            />
          </a>
        </div>
        {/* Background Reels Image */}
        <img
          src={userReelsImage}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        {/* Display Name User */}
        <div className="absolute inset-0 flex items-end justify-start px-5 py-3">
          <p className="text-white text-start font-bold align-bottom">{username}</p>
        </div>
      </li>
    </>
  )
}

export default function Reels() {
  // Interacive Reels Button
  const [activeMenu, setActiveMenu] = useState(() => {
    const activeMenuLS = localStorage.getItem('activeMenu')
    return activeMenuLS ? JSON.parse(activeMenuLS) : 'Cerita'
  })

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName)
  }

  useEffect(() => {
    localStorage.setItem('activeMenu', JSON.stringify(activeMenu))
  }, [activeMenu])
  // End Interactive Reels Button

  return (
    <>
      <div className="bg-white h-[280px] mb-5 rounded-md drop-shadow-sm z-0">
        {/* Header */}
        <div className="h-[20%] w-[96%] mx-auto flex justify-center items-center">
          {/* Cerita */}
          <ul className="mt-3 w-full h-[70%] flex justify-around items-center">
            <HeaderReels
              title={'Cerita'}
              Icon={FaBookOpen}
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
            />
            <HeaderReels
              title={'Reels'}
              Icon={CgClapperBoard}
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
            />
          </ul>
        </div>
        {/* End Header */}

        {/* Reels Content */}
        {/* Create Reels */}
        <div className="h-full px-5 py-5 flex gap-x-3">
          <div className="bg-slate-200 h-[80%] w-[160px] rounded-xl drop-shadow-lg hover:brightness-[0.85]">
            <CreateReels profileImage={'img/profile-default.jpg'} />
          </div>

          {/* List Reels Users */}
          <div className=" h-[80%] w-full rounded-xl relative overflow-hidden">
            <ul className="h-full flex gap-x-2 ml-2">
              <ReelsList
                username={'Bjirrr'}
                userProfileImage={'img/profile-default.jpg'}
                userReelsImage={'img/example.jpg'}
              />
              <ReelsList
                username={'Budi'}
                userProfileImage={'img/profile-default.jpg'}
                userReelsImage={'img/example.jpg'}
              />
              <ReelsList
                username={'Prakoso'}
                userProfileImage={'img/profile-default.jpg'}
                userReelsImage={'img/example.jpg'}
              />
            </ul>
          </div>
        </div>
        {/* End Reels Content */}
      </div>
    </>
  )
}
