/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoSearch, BsThreeDots, LuPlus, MdOutlineDisabledByDefault } from '../../assets/icons'
import { friends } from '../../dummyData/dummyData'

// Header Right Bar Component
const RightBarHeader = ({ IconSearch, IconSetting }) => {
  return (
    <>
      <div>
        <p className="font-semibold text-slate-500">Kontak</p>
      </div>
      <div className="flex gap-5">
        <a href="#">{IconSearch ? <IconSearch className="h-[20px] w-[20px] text-slate-500" /> : <MdOutlineDisabledByDefault className="h-[20px] w-[20px] text-slate-500" />}</a>
        <a href="#">{IconSetting ? <IconSetting className="h-[20px] w-[20px] text-slate-500" /> : <MdOutlineDisabledByDefault className="h-[20px] w-[20px] text-slate-500" />}</a>
      </div>
    </>
  )
}

// Friends List Component
const FriendList = ({ username, profileImage }) => {
  return (
    <>
      <li className="py-1 px-3 rounded-lg hover:bg-gray-300">
        <a
          href="#"
          className="flex justify-start items-center gap-3 "
        >
          <img
            src={profileImage}
            alt=""
            width={'35px'}
            height={'35px'}
            className="rounded-full"
          />
          <p className="font-semibold text-sm">{username}</p>
        </a>
      </li>
    </>
  )
}

// Header Group List Component
const HeaderGroupList = () => {
  return (
    <>
      <p className="font-bold text-slate-500">Percakapan grup</p>
    </>
  )
}

// Group List Component
const GroupList = ({ Icon }) => {
  return (
    <div className="py-3 px-5">
      <a
        href="#"
        className="flex items-center gap-2"
      >
        {Icon ? <Icon className="h-[28px] w-[28px] bg-slate-300 rounded-full" /> : <MdOutlineDisabledByDefault className="h-[28px] w-[28px] bg-slate-300 rounded-full" />}
        <p className="font-semibold text-slate-600">Buat Grup Baru</p>
      </a>
    </div>
  )
}

export default function Rightbar() {
  return (
    <>
      <div className="fixed h-full w-[20%] ml-[5%] flex flex-col gap-2">
        {/* Header */}
        <div className="h-[25px] flex justify-between items-center px-5">
          <RightBarHeader
            IconSearch={IoSearch}
            IconSetting={BsThreeDots}
          />
        </div>
        {/* Contact or Friend List */}
        <div className="border-b-2 border-slate-300 mr-5">
          <ul className="mb-2 px-1">
            {friends.map((friend, index) => (
              <FriendList
                key={index}
                username={friend.name}
                profileImage={friend.profile_image ? friend.profile_image : 'img/profile-default.jpg'}
              />
            ))}
          </ul>
        </div>

        {/* Group */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="px-5">
            <HeaderGroupList />
          </div>

          <div className="w-[95%] rounded-lg hover:bg-gray-300">
            <GroupList Icon={LuPlus} />
          </div>
        </div>
      </div>
    </>
  )
}
