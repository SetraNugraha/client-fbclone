import { Link } from "react-router-dom";

export const ProfilePicture = ({ user, size = 30 }) => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const useProfileImage = user.profile_image ? IMAGE_URL + user.profile_image : "img/profile-default.jpg";

  return (
    <Link to={`/profile/${user.id}`}>
      <img src={useProfileImage} alt="profile-image" style={{ width: size, height: size }} className="rounded-full border border-slate-300" />
    </Link>
  );
};
