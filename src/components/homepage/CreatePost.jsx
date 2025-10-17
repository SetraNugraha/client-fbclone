/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaVideo, BsFileImage, CgSmileMouthOpen, MdOutlineDisabledByDefault } from "../../assets/icons";

import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "../../elements/Modal";
import { Addons } from "./partials/CreatePost/Addons";
import { Header } from "./partials/CreatePost/Header";
import { useAuth } from "../../features/auth/useAuth";
import { usePostAction } from "../../features/posts/usePosts";

// Upload Post Component
const UploadPost = ({ btnName, Icon, IconColor }) => {
  return (
    <>
      <li className="hover:bg-slate-200 hover:rounded-xl flex items-center justify-center w-1/3 py-3">
        <a href="#" className="flex gap-2 justify-center items-center">
          {Icon ? <Icon className={`h-[25px] w-[25px] ${IconColor}`} /> : <MdOutlineDisabledByDefault className="h-[25px] w-[25px] text-slate-500" />}
          <p className="font-semibold text-sm text-slate-500">{btnName}</p>
        </a>
      </li>
    </>
  );
};

export default function CreatePost({ userId }) {
  const { authUser } = useAuth();
  const { useCreatePost, useFetchPosts } = usePostAction();
  const { refetch: refetchAllPosts } = useFetchPosts();
  const { refetch: refetchPostsByUserId } = useFetchPosts(userId);
  const textAreaRef = useRef(null);
  const [fileImgPost, setFileImgPost] = useState(null);
  const profileImageURL = import.meta.env.VITE_URL_PROFILE_IMAGE;
  const urlImage = authUser.profile_image ? `${profileImageURL}/${authUser.profile_image}` : "/img/profile-default.jpg";

  const [modalCreatePost, setModalCreatePost] = useState(() => {
    const getModalCreatePost = localStorage.getItem("modalCreatePost");
    return getModalCreatePost ? JSON.parse(getModalCreatePost) : false;
  });

  const handleModalCreatePost = () => {
    setModalCreatePost(true);
    setTimeout(() => {
      textAreaRef.current.focus();
    }, 0);
  };

  const handleUploadImgPost = (event) => {
    const file = event.target.files[0];
    if (file) {
      // file type
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        alert("Invlaid file type, please select a jpg, jpeg, or png image");
        return;
      }

      // max size 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be < 5MB");
        return;
      }

      formik.setFieldValue("post_image", file);
      setFileImgPost(file.name);
    }
  };

  const handleRemoveFileImgPost = () => {
    formik.setFieldValue("post_image", null);
    setFileImgPost(null);
    document.getElementById("uploadImgPost").value = null;
  };

  const formik = useFormik({
    initialValues: {
      user_id: "",
      body: "",
      post_image: null,
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("user_id", parseInt(authUser.id));
      formData.append("body", values.body);

      if (values.post_image) {
        formData.append("post_image", values.post_image);
      }

      createPostMutation.mutate(formData);
      resetForm();
    },
  });

  const createPostMutation = useCreatePost({
    onSuccess: () => {
      refetchAllPosts();
      refetchPostsByUserId();
      setFileImgPost(null);
      alert("Post Successfuly Created.");
      setModalCreatePost(false);
    },
    onError: () => {
      alert("Error While Creating Post !");
      setFileImgPost(null);
      setModalCreatePost(false);
    },
  });

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  // Text Post Component
  const TextPost = () => {
    return (
      <>
        <Link to={`/profile/${authUser.id}`}>
          <img src={urlImage} alt="" className="w-[43px] h-[43px] rounded-full border border-slate-300" />
        </Link>
        <input
          type="text"
          htmlFor="body"
          onClick={handleModalCreatePost}
          className="w-[90%] rounded-full cursor-pointer bg-slate-200 px-5 placeholder:text-slate-600 placeholder:text-md border-[1px] focus:outline-none focus:border-blue-600"
          placeholder={`Apa yang Anda pikirkan, ${authUser.first_name}?`}
        />
      </>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border-[0.5px] border-slate-300 mb-5">
        {/* Profile & Input */}
        <div className="w-[96%] flex justify-start items-center gap-x-4 py-2 mx-auto border-b-2 border-gray-300">
          <TextPost />
        </div>
        {/* End Profile & Input */}

        {/* Modal Create Post */}
        {modalCreatePost && (
          <Modal>
            <Modal.Header title="Create Post" disabled={createPostMutation.isLoading} onClick={() => setModalCreatePost(false)} />
            <Modal.Body>
              {/* Body Profile */}
              <Header authUser={authUser} />
              {/* End Body Profile */}

              {/* Body Post */}
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <textarea
                    type="text"
                    name="body"
                    id="body"
                    ref={textAreaRef}
                    onChange={handleFormInput}
                    value={formik.values.body}
                    placeholder={`Apa yang Anda pikirkan, ${authUser.first_name}?`}
                    className="text-xl pt-3 mt-3 w-full h-[200px] border-none placeholder:text-2xl resize-none focus:border-none focus:outline-none focus:ring-0"
                  />
                </div>
                {/* End Body Post */}

                {/* File Upload Name */}
                {fileImgPost && (
                  <div className=" mb-2 ml-1 flex gap-x-2 items-center">
                    <p className="font-semibold text-xs text-slate-700 bg-slate-300 px-2 py-1 inline-block rounded-md">{fileImgPost}</p>

                    {/* Button Remove File Image */}
                    <button onClick={handleRemoveFileImgPost} className="text-red-500 font-semibold">
                      x
                    </button>
                  </div>
                )}
                {/* END File Upload Name */}

                {/* Addons */}
                <Addons onChange={handleUploadImgPost} />
                {/* END Addons */}

                {/* Footer Button Submit */}
                <div>
                  {createPostMutation.isLoading ? (
                    <button
                      disabled={createPostMutation.isLoading}
                      type="submit"
                      className="py-1 disabled:cursor-not-allowed disabled:bg-slate-400 bg-blue-500 text-white font-semibold w-full my-3 rounded-lg text-lg hover:bg-opacity-70"
                    >
                      Creating Post ....
                    </button>
                  ) : (
                    <button
                      disabled={formik.values.body.length === 0 && !formik.values.post_image}
                      type="submit"
                      className="py-1 disabled:cursor-not-allowed disabled:bg-slate-400 bg-blue-500 text-white font-semibold w-full my-3 rounded-lg text-lg hover:bg-opacity-70"
                    >
                      Post
                    </button>
                  )}
                </div>
                {/* End Footer Button Submit */}
              </form>
            </Modal.Body>
          </Modal>
        )}

        {/* Button Post */}
        <div className="rounded-b-lg px-5 py-2">
          <ul className="flex items-center justify-around h-full px-2">
            <UploadPost btnName={"Video Siaran Langsung"} Icon={FaVideo} IconColor={"text-red-400"} />
            <UploadPost btnName={"Foto/Video"} Icon={BsFileImage} IconColor={"text-green-400"} />
            <UploadPost btnName={"Perasaan/aktivitas"} Icon={CgSmileMouthOpen} IconColor={"text-orange-400"} />
          </ul>
        </div>
        {/* End Button Post */}
      </div>
    </>
  );
}
