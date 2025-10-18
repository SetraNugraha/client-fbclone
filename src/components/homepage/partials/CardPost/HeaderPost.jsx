/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDots, BsXLg, MdOutlineDisabledByDefault } from "../../../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../features/auth/useAuth";
import { useState } from "react";
import Modal from "../../../../elements/Modal";

export const HeaderPost = ({ post, refetchAllPosts }) => {
  const { authUser, token, axiosJWT } = useAuth();
  const [deletePostLoading, setdeletePostLoading] = useState(false);
  const { username, profile_image } = post.author;
  const profileImageURL = import.meta.env.VITE_URL_PROFILE_IMAGE;
  const urlProfileImage = profile_image ? `${profileImageURL}/${profile_image}` : "/img/profile-default.jpg";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Header Post Option Component
  const HeaderPostOption = ({ Icon }) => {
    return (
      <>
        <li>
          <a href="#">
            {Icon ? (
              <Icon className="font-bold h-[20px] w-[20px] text-slate-500" />
            ) : (
              <MdOutlineDisabledByDefault className="font-bold h-[20px] w-[20px] text-slate-500" />
            )}
          </a>
        </li>
      </>
    );
  };

  // Header Post Component
  const Profile = ({ username, datePost, userProfileImage, userId }) => {
    return (
      <>
        <Link to={`/profile/${userId}`} className="flex items-center gap-3">
          <img src={userProfileImage} alt="Profile_image" className="h-[35px] w-[35px] rounded-full border border-slate-300" />

          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs">{datePost}</p>
          </div>
        </Link>
      </>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items center px-3 py-2">
        {/* Profile */}
        <div>
          <Profile username={username} userProfileImage={urlProfileImage} datePost={formatDate(post.created_at)} userId={post.author.id} />
        </div>

        {/* Option */}
        <div>
          <ul className="flex justify-center items-center gap-x-3">
            {/* option */}
            <HeaderPostOption Icon={BsThreeDots} />
            {/* Delete */}
            {post.author.id === authUser.id && (
              <button onClick={() => deletePost(post.id)} className="text-slate-500 cursor-pointer">
                <BsXLg />
              </button>
            )}
          </ul>
        </div>
      </div>
      {deletePostLoading && (
        <Modal>
          <Modal.Body>
            <h1 className="font-semibold text-center p-3 italic">Sedang Proses Delete Post, Mohon Tunggu Sebentar ....</h1>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
