/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsChat, BiLike, MdOutlineDisabledByDefault, PiShareFat, HiThumbUp } from "../../assets/icons";
import { useState } from "react";
import { CommentSection } from "./partials/CardPost/CommentSection";
import { HeaderPost } from "./partials/CardPost/HeaderPost";
import { useAuth } from "../../features/auth/useAuth";
import { usePostAction } from "../../features/posts/usePosts";

// Content Post Component
const RenderContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(true);
  };

  const maxLength = 100;

  if (content.length <= maxLength || isExpanded) {
    return <p className="break-words">{content}</p>;
  } else {
    return (
      <>
        <p className="break-words">
          {`${content.substring(0, maxLength)} ...`}{" "}
          <span>
            <button onClick={toggleReadMore} className="font-semibold text-sm hover:border-b-[1px] hover:border-black">
              Lihat Selengkapnya ...
            </button>
          </span>
        </p>
      </>
    );
  }
};

// Button Action Post Component
const ButtonActionPost = ({ Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-[85%] w-1/3 font-semibold text-slate-500 flex justify-center items-center gap-2 rounded-sm hover:bg-slate-200"
    >
      {Icon ? <Icon className="h-[25px] w-[25px]" /> : <MdOutlineDisabledByDefault className="h-[25px] w-[25px]" />}
      <p className="text-sm">{title}</p>
    </button>
  );
};
export default function CardPost({ userId, posts, refetchAllPosts }) {
  const { authUser } = useAuth();
  const { useCreateLike } = usePostAction();
  const postImageURL = import.meta.env.VITE_URL_POST_IMAGE;
  const [showInputComment, setShowInputComment] = useState(null);

  const LikeButton = ({ postId, userId, initialLiked, refetchAllPosts }) => {
    const [hasLike, setHasLike] = useState(initialLiked);

    const { mutate } = useCreateLike({
      onSuccess: () => {
        refetchAllPosts();
        setHasLike(!hasLike);
      },
    });
    const handleLike = async () => {
      try {
        mutate({ postId, userId, initialLiked: hasLike });
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <button
        onClick={handleLike}
        className={`h-[85%] w-1/3 font-semibold text-${
          hasLike ? "blue" : "slate"
        }-500 flex justify-center items-center gap-2 rounded-sm hover:bg-slate-200`}
      >
        <BiLike className={`h-[25px] w-[25px] text-${hasLike ? "blue" : "slate"}-500`} />
        <p className="text-sm">{hasLike ? "Liked" : "Like"}</p>
      </button>
    );
  };

  if (!posts || posts.length === 0) {
    return <p className=" mt-7 text-center text-slate-400 font-semibold">No Post Found !</p>;
  }

  return (
    <div>
      {posts.map((post, index) => {
        const lastPost = index === posts.length - 1;
        const hasPostImage = post.post_image;
        const postImage = hasPostImage ? `${postImageURL}/${hasPostImage}` : null;
        const comments = post.comment;
        const likes = post.like;
        const userHasLiked = likes.some((like) => like.user_id === authUser.id);

        return (
          <div key={post.id} className="max-h-100 mb-5">
            <div className="bg-white rounded-lg">
              {/* Header */}
              <HeaderPost post={post} refetchAllPosts={refetchAllPosts} />

              {/* Post User */}
              <div className="px-4 py-2">
                <RenderContent content={post.body} />
                {postImage && (
                  <a href={`${postImage}`} target="_blank" rel="noreferrer">
                    <img src={`${postImage}`} alt="" className="py-3 max-h-100 max-w-100" />
                  </a>
                )}
              </div>

              {/* Info Like & Comment */}
              <div className="flex justify-between items-center px-4 pb-1 mt-2">
                <a href="#" className="flex items-center gap-1">
                  <HiThumbUp className="h-[20px] w-[20px] bg-blue-500 rounded-full text-white p-1" />
                  <p>{likes.length}</p>
                </a>
                <a href="#" className="hover:border-b-[1px] hover:border-slate-400">
                  <p className="text-slate-400">{comments.length} Komentar</p>
                </a>
              </div>

              {/* Button Like, Comment, Share */}
              <div
                className={`h-[40px] w-[96%] mx-auto my-2 border-t-[1px] border-slate-400 flex justify-around items-center ${
                  comments.length != 0 || showInputComment === post.id ? "border-b-[1px] mb-3" : null
                }`}
              >
                {/* Like Button */}
                <LikeButton postId={post.id} userId={authUser.id} initialLiked={userHasLiked} refetchAllPosts={refetchAllPosts} />
                {/* END Like Button */}

                <ButtonActionPost
                  Icon={BsChat}
                  title={"Comment"}
                  onClick={() => setShowInputComment(showInputComment === post.id ? null : post.id)}
                />
                <ButtonActionPost Icon={PiShareFat} title={"Share"} />
              </div>

              {/* Comment */}
              <div>
                {(comments.length != 0 || showInputComment === post.id) && (
                  <CommentSection post={post} userId={authUser.id} refetchAllPosts={refetchAllPosts} />
                )}
              </div>
            </div>
            {lastPost ? <p className="text-center text-slate-400 mt-5 pb-5 font-semibold">You have reached the last post</p> : null}
          </div>
        );
      })}
    </div>
  );
}
