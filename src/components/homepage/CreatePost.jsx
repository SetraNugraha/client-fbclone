/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaVideo, BsFileImage, CgSmileMouthOpen } from "../../assets/icons";

import { useRef, useState } from "react";
import Modal from "../../elements/Modal";
import { Addons } from "./partials/CreatePost/Addons";
import { Header } from "./partials/CreatePost/Header";
import { usePosts } from "../../features/posts/usePosts";
import { AxiosError } from "axios";
import { ProfilePicture } from "../../elements/ProfilePicture";

export default function CreatePost({ user }) {
  const { createPost } = usePosts();
  const textAreaRef = useRef(null);

  const [modalCreatePost, setModalCreatePost] = useState(() => {
    const getModalCreatePost = localStorage.getItem("modalCreatePost");
    return getModalCreatePost ? JSON.parse(getModalCreatePost) : false;
  });

  // STATE Payload Create Post
  const [payload, setPayload] = useState({
    body: "",
    post_image: null,
  });

  const handleModalCreatePost = () => {
    setModalCreatePost(true);
    setTimeout(() => {
      textAreaRef.current.focus();
    }, 0);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];

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

      setPayload((prev) => ({
        ...prev,
        [name]: file || null,
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    createPost.mutate(payload, {
      onSuccess: (data) => {
        setPayload({
          body: "",
          post_image: null,
        });
        setModalCreatePost(false);
        alert("success create new post");
      },
      onError: (error) => {
        console.error("createPost Mutate error: ", error.response?.data);
        if (error instanceof AxiosError) {
          const errors = error.response?.data?.errors;

          if (errors.body) {
            return alert(errors.body[0]);
          } else if (errors.post_image) {
            return alert(errors.post_images[0]);
          }
          return alert("error while creating post, please try again later.");
        }
      },
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg border-[0.5px] border-slate-300 mb-5">
        {/* Profile & Input */}
        <div className="p-2 mx-auto border-b-2 border-gray-300">
          <div className="w-full flex items-center justify-around gap-x-2">
            <ProfilePicture user={user} size={40} />
            {/* Trigger Modal Create Post */}
            <input
              type="text"
              name="body"
              htmlFor="body"
              onClick={handleModalCreatePost}
              className="w-[90%] rounded-full cursor-pointer bg-slate-200 px-5 placeholder:text-slate-600 placeholder:text-md border-[1px] focus:outline-none focus:border-blue-600"
              placeholder={`Apa yang Anda pikirkan, ${user.first_name}?`}
            />
          </div>
        </div>
        {/* End Profile & Input */}

        {/* Modal Create Post */}
        {modalCreatePost && (
          <Modal>
            <Modal.Header title="Create Post" disabled={createPost.isLoading} onClick={() => setModalCreatePost(false)} />
            <Modal.Body>
              {/* Body Profile */}
              <Header authUser={user} />
              {/* End Body Profile */}

              {/* Body Post */}
              <form onSubmit={handleCreatePost}>
                <textarea
                  type="text"
                  name="body"
                  id="body"
                  ref={textAreaRef}
                  onChange={handleChange}
                  value={payload.body}
                  placeholder={`Apa yang Anda pikirkan, ${user.first_name}?`}
                  className="text-xl pt-3 mt-3 w-full h-[200px] border-none placeholder:text-2xl resize-none focus:border-none focus:outline-none focus:ring-0"
                />

                {/* End Body Post */}

                {/* File Upload Name */}
                {payload.post_image && (
                  <div className=" mb-2 ml-1 flex gap-x-2 items-center">
                    <p className="font-semibold text-xs text-slate-700 bg-slate-300 px-2 py-1 inline-block rounded-md">{payload.post_image.name}</p>

                    {/* Button Remove File Image */}
                    <button onClick={() => setPayload((prev) => ({ ...prev, post_image: null }))} className="text-red-500 font-semibold">
                      x
                    </button>
                  </div>
                )}
                {/* END File Upload Name */}

                {/* Addons */}
                <Addons onChange={handleChange} />
                {/* END Addons */}

                {/* Footer Button Submit */}
                <button
                  disabled={(payload.body.length === 0 && !payload.post_image) || createPost.isLoading}
                  type="submit"
                  className="py-1 disabled:cursor-not-allowed disabled:bg-slate-400 bg-blue-500 text-white font-semibold w-full my-3 rounded-lg text-lg hover:bg-opacity-70"
                >
                  {createPost.isLoading ? "Please wait .... " : "Post"}
                </button>
                {/* End Footer Button Submit */}
              </form>
            </Modal.Body>
          </Modal>
        )}

        {/* Footer Create Post */}
        <div className="rounded-b-lg px-5 py-2">
          <ul className="flex items-center justify-around h-full px-2">
            <li className="hover:bg-slate-200 cursor-pointer hover:rounded-xl flex items-center justify-center gap-x-2 w-1/3 py-3">
              <FaVideo className="text-red-400 size-5" />
              <p className="font-semibold text-sm text-slate-500">Video Siaran Langsung</p>
            </li>

            <li className="hover:bg-slate-200 cursor-pointer hover:rounded-xl flex items-center justify-center gap-x-2 w-1/3 py-3">
              <BsFileImage className="text-green-400 size-5" />
              <p className="font-semibold text-sm text-slate-500">Foto/Video</p>
            </li>

            <li className="hover:bg-slate-200 cursor-pointer hover:rounded-xl flex items-center justify-center gap-x-2 w-1/3 py-3">
              <CgSmileMouthOpen className="text-orange-400 size-5" />
              <p className="font-semibold text-sm text-slate-500">Perasaan/aktivitas</p>
            </li>
          </ul>
        </div>
        {/* End Button Post */}
      </div>
    </>
  );
}
