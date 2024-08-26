/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { friends, copyright } from '../../dummyData/dummyData'
import { useAuth } from '../../features/auth/useAuth'

export const LeftContent = ({ userId }) => {
  const { authUser } = useAuth()
  const isOwnProfile = authUser.id === parseInt(userId)

  return (
    <>
      {/* Intro */}
      {isOwnProfile && (
        <div className="bg-white border-[0.5px] border-slate-300 rounded-lg px-4 py-4 mb-5">
          <h1 className="font-bold text-xl pb-4">Intro</h1>
          <div className="flex flex-col gap-y-5">
            <button className="font-semibold  w-full bg-slate-200 rounded-md py-2 hover:bg-slate-300">Tambahkan Biografi</button>
            <button className="font-semibold  w-full bg-slate-200 rounded-md py-2 hover:bg-slate-300">Edit Perincian</button>
            <button className="font-semibold  w-full bg-slate-200 rounded-md py-2 hover:bg-slate-300">Tambahkan Unggulan</button>
          </div>
        </div>
      )}

      {/* Foto */}
      <div>
        <div className="flex justify-between items-center px-5 bg-white border-[0.5px] border-slate-300 py-3 rounded-lg">
          {/* Title */}
          <div>
            <h1 className="font-bold text-xl hover:border-b-[2px] hover:border-black hover:cursor-pointer">Foto</h1>
          </div>

          {/* Link Text */}
          <div className="px-2 py-1 rounded-md hover:bg-slate-200 hover:opacity-125">
            <a
              href="#"
              className="text-blue-600 text-[18px] hover:text-blue-600"
            >
              Lihat Semua Foto
            </a>
          </div>
        </div>
      </div>

      {/* List Teman */}
      <div>
        <div className="flex flex-col justify-between items-start px-5 mt-5 pb-8 bg-white py-3 rounded-lg border-[0.5px] border-slate-300">
          {/* Header */}
          <div className="flex justify-between items-start w-full">
            {/* Title */}
            <div>
              <h1 className=" font-bold text-xl hover:border-b hover:border-white hover:cursor-pointer">Teman</h1>
              <p className="text-slate-500">14 Teman</p>
            </div>

            {/* Link Text */}
            <div className="px-2 py-1 rounded-md hover:bg-slate-200">
              <a
                href="#"
                className="text-blue-600 text-[18px] hover:text-blue-600"
              >
                Lihat Semua Teman
              </a>
            </div>
          </div>

          {/* List Teman */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-y-1 hover:cursor-pointer"
              >
                <img
                  src={friend.profile_image ? friend.profile_image : '/img/profile-default.jpg'}
                  alt=""
                  className="w-[150px] h-[150px] rounded-md"
                />
                <h1 className="font-semibold hover:border-b hover:border-black">{friend.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex gap-x-2 mt-2 ml-2 text-[13px]">
        {copyright.map((item, index) => (
          <a
            key={index}
            href="#"
            className="hover:border-b hover:border-black "
          >
            {item}
          </a>
        ))}
        <span>Meta &copy; 2024</span>
      </div>
    </>
  )
}
