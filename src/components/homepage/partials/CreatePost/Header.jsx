/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoPeopleSharp, VscTriangleDown } from '../../../../assets/icons'

export const Header = ({ authUser }) => {
  const username = authUser.first_name + ' ' + authUser.surname
  const profileImg = authUser.profile_image
  const urlImage = profileImg ? `http://localhost:5000/img/profile_images/${profileImg}` : '/img/profile-default.jpg'
  return (
    <div className="flex gap-x-3 items-center mt-3">
      <img
        src={urlImage}
        alt="profile_picture"
        className="w-[43px] h-[43px] rounded-full border border-slate-300"
      />
      <div>
        <p className="font-semibold">{username}</p>
        <button
          type="button"
          className="bg-slate-200 px-2 font-semibold flex items-center gap-x-1 rounded-lg"
        >
          <i>
            <IoPeopleSharp />
          </i>
          Friends
          <i>
            <VscTriangleDown />
          </i>
        </button>
      </div>
    </div>
  )
}
