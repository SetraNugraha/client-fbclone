import { getProfilePicture } from "../utils/getProfilePicture";

export const ProfilePicture = ({ user, size = 30 }) => {
  const profilePicture = getProfilePicture(user?.profile_image);

  return <img src={profilePicture} alt="profile-image" style={{ width: size, height: size }} className="rounded-full border border-slate-300" />;
};
