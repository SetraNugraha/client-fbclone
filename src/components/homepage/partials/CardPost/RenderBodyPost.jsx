import { useState } from "react";

export const RenderBodyPost = ({ post }) => {
  const IMAGE_URL = import.meta.env.VITE_URL_IMAGE;
  const postImage = post?.post_image ? IMAGE_URL + post?.post_image : null;
  const maxLength = 100;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(true);
  };

  if (post?.body?.length <= maxLength || isExpanded) {
    return (
      <>
        <p className="break-words">{post?.body}</p>
        {post?.post_image && (
          <a href={postImage} target="_blank" rel="noreferrer">
            <img src={postImage} alt="post-image" className="py-3 max-h-100 max-w-100" />
          </a>
        )}
      </>
    );
  } else {
    return (
      <>
        <p className="break-words">
          {`${post?.body.substring(0, maxLength)} ...`}{" "}
          <span>
            <button onClick={toggleReadMore} className="font-semibold text-sm hover:border-b-[1px] hover:border-black">
              Lihat Selengkapnya ...
            </button>
          </span>
        </p>

        {post?.post_image && (
          <a href={postImage} target="_blank" rel="noreferrer">
            <img src={postImage} alt="post-image" className="py-3 max-h-100 max-w-100" />
          </a>
        )}
      </>
    );
  }
};
