/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { friends } from "./partials/Rightbar/friends";
import { RightbarHeader } from "./partials/Rightbar/RightbarHeader";
import { FriendList } from "./partials/Rightbar/FriendList";
import { Group } from "./partials/Rightbar/Group";

export default function Rightbar() {
  return (
    <>
      <div className="fixed h-full w-[20%] ml-[5%] flex flex-col gap-2">
        {/* Header */}
        <div className="h-[25px] flex justify-between items-center px-5">
          <RightbarHeader />
        </div>
        {/* Contact or Friend List */}
        <div className="border-b-2 border-slate-300 mr-5">
          <ul className="mb-2 px-1">
            {friends.map((friend, index) => (
              <FriendList key={index} username={friend.name} profileImage={friend.profile_image ? friend.profile_image : "img/profile-default.jpg"} />
            ))}
          </ul>
        </div>

        {/* Group */}
        <Group />
      </div>
    </>
  );
}
