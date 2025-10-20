/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaPen, GoPlus } from "../../assets/icons";
import { menu } from "../../dummyData/dummyData";
import { friendsImage } from "../../dummyData/dummyData";
import { useAuth } from "@/hooks/useAuth";
import Modal from "../../elements/Modal";
import { getProfilePicture } from "../../utils/getProfilePicture";

export const HeaderProfile = ({ user }) => {
  const { authUser } = useAuth();
  const isOwnProfile = authUser.id === user?.id;
  const username = user?.first_name + " " + user?.surname || "unknown";
  const profilePicture = getProfilePicture(user?.profile_image);

  const [modalUpdateProfileImage, setModalUpdateProfileImage] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleModal = () => {
    setModalUpdateProfileImage(false);
    formik.setFieldValue("post_image", null);
    setFileName(null);
    document.getElementById("profileImage").value = null;
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col">
        {/* Profile */}
        <div className="flex items-center gap-x-7 border-b-[1px] border-slate-400 pb-5">
          {/* Profile Image */}
          <div className="w-[20%]">
            <img src={profilePicture} alt="profile-image" className="rounded-full w-[150px] h-[150px] hover:opacity-70" />
          </div>
          {/* Name & Total Friend */}
          <div className="mt-5 w-[80%] flex justify-between items-end">
            <div className="flex flex-col gap-y-3 relative right-[90px]">
              {/* Name */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{username}</h1>
                <p className="font-semibold">14 Total Teman</p>
              </div>
              {/* Friend Image */}
              <div className="flex">
                {friendsImage.map((item, index) => (
                  <img key={index} src={`/img/${item}`} alt="profile-picture" className="rounded-full w-[33px] h-[33px] hover:opacity-70 -mr-2" />
                ))}
              </div>
            </div>

            {/* Button story & edit */}
            {isOwnProfile && (
              <div className="flex gap-x-2">
                <button className="px-3 py-2 flex gap-x-2 items-center bg-blue-600 text-white font-semibold rounded-md hover:brightness-125">
                  <span>
                    <GoPlus className="w-[23px] h-[23px]" />
                  </span>
                  Tambahkan ke cerita
                </button>
                <button
                  onClick={() => setModalUpdateProfileImage(true)}
                  className="px-3 py-2 flex gap-x-2 items-center bg-gray-200 font-semibold rounded-md hover:bg-gray-300"
                >
                  <span>
                    <FaPen className="w-[15px] h-[15px]" />
                  </span>
                  Edit profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Open Modal */}
        {modalUpdateProfileImage && (
          <Modal>
            <Modal.Header title="Update Profile Image" onClick={handleModal} />
            <Modal.Body>
              {/* Button Delete Profile Image */}
              {profile_image && <button className="px-2 py-1 text-white bg-red-500 rounded-lg font-semibold text-[12px]">Delete</button>}
              {/* END Button Delete Profile Image */}

              <form className="flex flex-col justify-center items-center gap-y-5 mt-5">
                <input type="file" id="profileImage" name="profile_image" className="hidden" />
                {/* Profile Image Section */}
                <label htmlFor="profileImage">
                  <img
                    src={"img/profile-image.jpg"}
                    alt="profile-image"
                    className="rounded-full w-[300px] h-[300px] cursor-pointer hover:opacity-70 border border-slate-400"
                  />
                </label>
                {/* END Profile Image Section */}

                {/* {fileName && (
                  <div className=" mb-2 ml-1 flex gap-x-2 items-center">
                    <p className="font-semibold text-xs text-slate-700 bg-slate-300 px-2 py-1 inline-block rounded-md">{fileName}</p>

                    <button className="text-red-500 font-semibold">
                      x
                    </button>
                  </div>
                )} */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold w-full p-2 mb-3 rounded-lg disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-opacity-70"
                >
                  Update Profile
                </button>
              </form>
            </Modal.Body>
          </Modal>
        )}

        {/* Menu */}
        <div className="flex gap-x-3 items-center">
          <a href="#" className="font-semibold text-blue-600 border-b-[2px] border-blue-600 hover:bg-slate-200 hover:rounded-lg mt-1 p-3">
            Postingan
          </a>
          {menu.map((item, index) => (
            <div key={index} className="flex gap-x-3">
              <a href={item.path} className="font-semibold p-3 hover:bg-slate-200 hover:rounded-lg mt-1">
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
