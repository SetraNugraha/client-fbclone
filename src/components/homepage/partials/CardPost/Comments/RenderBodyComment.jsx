import { useState } from "react";

export const RenderBodyComment = ({ bodyComment }) => {
  const [expandComment, setExpandComment] = useState(false);
  const maxLength = 100;

  const handleExpandComment = () => {
    setExpandComment(true);
  };

  if (bodyComment.length < maxLength || expandComment) {
    return bodyComment;
  } else {
    return (
      <p className="display:inline">
        {`${textComment.substring(0, maxLength)} ... `}
        <span>
          <button onClick={handleExpandComment} className="text-sm font-semibold hover:border-b-[1px] hover:border-black">
            Lihat Selengkapnya ...
          </button>
        </span>
      </p>
    );
  }
};
