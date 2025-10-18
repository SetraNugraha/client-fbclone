export const FriendList = ({ username, profileImage }) => {
  return (
    <li className="py-1 px-3 rounded-lg hover:bg-gray-300">
      <a href="#" className="flex justify-start items-center gap-3 ">
        <img src={profileImage} alt="profile-image" width={"35px"} height={"35px"} className="rounded-full" />
        <p className="font-semibold text-sm">{username}</p>
      </a>
    </li>
  );
};
