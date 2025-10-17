export const Profile = ({ username, profileImg = "img/profile-default.jpg" }) => {
  return (
    <div className="py-2 px-3">
      <a href="#" className="flex justify-start items-center gap-3 ">
        <img src={profileImg} alt="" className="w-[30px] h-[30px] rounded-full" />
        <p className="font-semibold text-md">{username}</p>
      </a>
    </div>
  );
};
