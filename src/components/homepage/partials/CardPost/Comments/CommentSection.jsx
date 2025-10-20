/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoPaperPlaneSharp } from "../../../../../assets/icons";
import { ProfilePicture } from "../../../../../elements/ProfilePicture";
import { useAuth } from "@/hooks/useAuth";
import { RecentComments } from "./RecentComments";
import { usePosts } from "@/hooks/usePosts";
import { LoadingOverlay } from "../../../../../elements/LoadingOverlay";

export const CommentSection = ({ post }) => {
  const { authUser } = useAuth();
  const { createComment } = usePosts();
  const comments = post?.comments;
  const [bodyComment, setBodyComment] = useState("");

  const handleCreateComment = (e) => {
    e.preventDefault();

    createComment.mutate(
      { postId: post?.id, body: bodyComment },
      {
        onSuccess: () => {
          setBodyComment("");
        },
        onError: (error) => {
          console.error("error create comment: ", error);
          alert("error while creating comment, please try again later.");
          setBodyComment("");
        },
      }
    );
  };

  return (
    <>
      <LoadingOverlay isLoading={createComment.isLoading} />

      {comments?.map((comment, index) => {
        return <RecentComments key={index} user={comment.user} comment={comment} />;
      })}

      {/* Input Comment */}
      <div className="h-[50px] flex items-center gap-x-3 px-5 pb-3">
        <ProfilePicture user={authUser} size={40} />

        <form onSubmit={handleCreateComment} className="w-full relative">
          <input
            type="text"
            name="body"
            className="h-[95%] w-full rounded-2xl bg-slate-100 px-5 placeholder:text-slate-600 placeholder:text-lg disabled:cursor-not-allowed"
            placeholder={"Tulis Komentar ...."}
            value={bodyComment}
            onChange={(e) => setBodyComment(e.target.value)}
          />

          <button type="submit" className="absolute top-1/2 transform -translate-y-1/2 right-4 disabled:cursor-not-allowed">
            <IoPaperPlaneSharp className="w-[20px] h-[20px] text-slate-500" />
          </button>
        </form>
      </div>
    </>
  );
};
