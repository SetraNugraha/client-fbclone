/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDots, IoPaperPlaneSharp } from "../../../../assets/icons";
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../features/auth/useAuth";
import { usePostAction } from "../../../../features/posts/usePosts";

// Text Comment
const RenderComment = ({ textComment }) => {
  const [expandComment, setExpandComment] = useState(false);
  const maxLength = 100;

  const handleExpandComment = () => {
    setExpandComment(true);
  };

  if (textComment.length < maxLength || expandComment) {
    return textComment;
  } else {
    return (
      <>
        <p className="display:inline">
          {`${textComment.substring(0, maxLength)} ... `}
          <span>
            <button onClick={handleExpandComment} className="text-sm font-semibold hover:border-b-[1px] hover:border-black">
              Lihat Selengkapnya ...
            </button>
          </span>
        </p>
      </>
    );
  }
};

// Show ALl Comment Component
const ShowAllComment = () => {
  return (
    <>
      <a href="#" className="font-semibold text-sm text-slate-400 hover:border-b-[1px] hover:border-slate-400">
        Lihat Komentar Lain
      </a>
    </>
  );
};

// Recent Comment Component
const RecentComment = ({ username, profileImg, textComment, date, userId }) => {
  const ProfileImage = ({ profileImg }) => {
    return (
      <>
        <Link to={`/profile/${userId}`} className="ml-10">
          <img src={profileImg} alt="profile-image" className="h-full w-full rounded-full" />
        </Link>
      </>
    );
  };

  const CardComment = ({ username, textComment }) => {
    return (
      <>
        <div className="bg-slate-100 max-w-[92%] mx-1 px-3 py-1 rounded-2xl">
          <div>
            <Link to={`/profile/${userId}`} className="font-semibold text-sm">
              {username}
            </Link>
          </div>
          <div>
            <RenderComment textComment={textComment} />
          </div>
        </div>
      </>
    );
  };

  const BtnOptionComment = () => {
    return (
      <>
        <button className="hover:bg-slate-100 flex items-center justify-center h-[35px] w-[35px] rounded-full">
          <BsThreeDots />
        </button>
      </>
    );
  };

  const ActionBtnComment = ({ date }) => {
    return (
      <>
        <p className="text-slate-500">{date}</p>
        <button className="font-bold text-md text-slate-500">Suka</button>
        <button className="font-bold text-md text-slate-500">Balas</button>
      </>
    );
  };

  return (
    <>
      <div className="flex gap-1 py-2 px-5">
        {/* Profile Image */}
        <div className="w-[35px] h-[35px] mt-[-23px]">
          <ProfileImage profileImg={profileImg} />
        </div>
        <div className="flex flex-col justify-center items-start gap-1">
          {/* User & Comment User */}
          <div className="flex items-center gap-1">
            <CardComment username={username} textComment={textComment} />
            <BtnOptionComment />
          </div>
          {/* Time & Like, Comment  */}
          <div className="flex gap-5 mx-5">
            <ActionBtnComment date={date} />
          </div>
        </div>
      </div>
    </>
  );
};

export const CommentSection = ({ post, userId, refetchAllPosts }) => {
  const { authUser } = useAuth();
  const { useCreateComment } = usePostAction();
  const profileImageURL = import.meta.env.VITE_URL_PROFILE_IMAGE;
  const comments = post.comment;
  const profileImgUserLogin = authUser.profile_image;
  const urlImageAuthUser = profileImgUserLogin ? `${profileImageURL}/${profileImgUserLogin}` : "/img/profile-default.jpg";

  const createCommentMutation = useCreateComment({
    onSuccess: () => {
      refetchAllPosts();
    },
  });

  const formik = useFormik({
    initialValues: {
      post_id: parseInt(post.id),
      user_id: parseInt(userId),
      body: "",
    },
    onSubmit: (values, { resetForm }) => {
      createCommentMutation.mutate(values);
      resetForm();
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      {comments.map((comment, index) => {
        const { id: userId, first_name, surname, profile_image: profileImageUserComment } = comment.user;
        const username = first_name + " " + surname;
        const urlImageUserComment = profileImageUserComment ? `${profileImageURL}/${profileImageUserComment}` : "/img/profile-default.jpg";

        return (
          <RecentComment
            key={index}
            userId={userId}
            profileImg={urlImageUserComment}
            username={username ? username : "unknow"}
            textComment={comment.body}
            date={formatDate(comment.created_at)}
          />
        );
      })}

      {/* Input Comment */}
      <div className="h-[50px] flex justify-start items-center gap-2 px-5 pb-3">
        <a href="#">
          <img src={urlImageAuthUser} alt="profile-image" className="h-[40px] w-[40px] rounded-full" />
        </a>
        <form className="w-full relative" onSubmit={formik.handleSubmit}>
          <div className="w-full relative">
            <input
              type="text"
              name="body"
              disabled={createCommentMutation.isLoading}
              onChange={formik.handleChange}
              value={formik.values.body}
              className="h-[95%] w-full rounded-2xl bg-slate-100 px-5 placeholder:text-slate-600 placeholder:text-lg disabled:cursor-not-allowed"
              placeholder={createCommentMutation.isLoading ? "Proses Mengirim Komentar ...." : "Tulis Komentar ...."}
            />

            <button
              type="submit"
              disabled={createCommentMutation.isLoading}
              className="absolute top-1/2 transform -translate-y-1/2 right-4 disabled:cursor-not-allowed"
            >
              <IoPaperPlaneSharp className="w-[20px] h-[20px] text-slate-500" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
