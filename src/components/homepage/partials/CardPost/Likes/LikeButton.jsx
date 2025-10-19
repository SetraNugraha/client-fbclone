import { useState } from "react";
import { BiLike } from "../../../../../assets/icons";

export const LikeButton = ({ userId, postId, initialLiked }) => {
  const [hasLike, setHasLike] = useState(initialLiked);

  return (
    <button
      className={`h-[85%] w-1/3 font-semibold text-${
        hasLike ? "blue" : "slate"
      }-500 flex justify-center items-center gap-2 rounded-sm hover:bg-slate-200`}
    >
      <BiLike className={`size-[20px] text-${hasLike ? "blue" : "slate"}-500`} />
      <p className="text-sm">{hasLike ? "Liked" : "Like"}</p>
    </button>
  );
};
