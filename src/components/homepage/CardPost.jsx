/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsChat, BiLike, MdOutlineDisabledByDefault, PiShareFat, HiThumbUp } from "../../assets/icons";
import { useState } from "react";
import { CommentSection } from "./partials/CardPost/Comments/CommentSection";
import { HeaderPost } from "./partials/CardPost/HeaderPost";
import { useAuth } from "../../features/auth/useAuth";
import { RenderBodyPost } from "./partials/CardPost/RenderBodyPost";
import { LikeButton } from "./partials/CardPost/Likes/LikeButton";
import { ButtonActionPost } from "./partials/CardPost/ButtonActionPost";

export default function CardPost({ userId, posts }) {
  const { authUser } = useAuth();
  const [showInputComment, setShowInputComment] = useState(null);

  if (!posts || posts.length === 0) {
    return <p className=" mt-7 text-center text-slate-400 font-semibold">No Post Found !</p>;
  }

  return (
    <div>
      {posts.map((post, index) => {
        const isLastPost = index === posts.length - 1;
        return (
          <div key={post.id} className="max-h-100 mb-5">
            <div className="bg-white rounded-lg">
              {/* Header */}
              <HeaderPost post={post} />

              {/* Post User */}
              <div className="px-4 py-2">
                <RenderBodyPost post={post} />
              </div>

              {/* Info Like & Comment */}
              <div className="flex justify-between items-center px-4 pb-1 mt-2">
                <a href="#" className="flex items-center gap-1">
                  <HiThumbUp className="h-[20px] w-[20px] bg-blue-500 rounded-full text-white p-1" />
                  <p>{post.likes_count}</p>
                </a>
                <a href="#">
                  <p className="text-slate-400 hover:underline hover:text-slate-400">{post.comments_count} Komentar</p>
                </a>
              </div>

              {/* Button Like, Comment, Share */}
              <div
                className={`h-[40px] w-[96%] mx-auto my-2 border-t-[1px] border-slate-400 flex justify-around items-center ${
                  post.comments.length != 0 || showInputComment === post.id ? "border-b-[1px] mb-3" : null
                }`}
              >
                {/* Like Button */}
                <LikeButton postId={post.id} userId={authUser.id} />

                {/* Comment Button */}
                <ButtonActionPost
                  Icon={BsChat}
                  title={"Comment"}
                  onClick={() => setShowInputComment(showInputComment === post.id ? null : post.id)}
                />

                {/* Share Button */}
                <ButtonActionPost Icon={PiShareFat} title={"Share"} />
              </div>

              {/* Comment */}
              <div>{(post.comments.length != 0 || showInputComment === post.id) && <CommentSection post={post} userId={authUser.id} />}</div>
            </div>
            {isLastPost ? <p className="text-center text-slate-400 mt-5 pb-5 font-semibold">You have reached the last post</p> : null}
          </div>
        );
      })}
    </div>
  );
}
