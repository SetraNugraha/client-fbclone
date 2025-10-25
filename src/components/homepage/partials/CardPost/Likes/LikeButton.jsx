import { BiLike } from "../../../../../assets/icons";
import { useToggleLikes } from "../../../../../hooks/likes";

export const LikeButton = ({ postId, isLike }) => {
  const { mutate: toggleLike } = useToggleLikes();

  const handleToggleLike = () => {
    toggleLike(postId, {
      onError: (error) => {
        console.error("handle toggle like error: ", error);
      },
    });
  };

  return (
    <button
      onClick={handleToggleLike}
      className={`h-[85%] w-1/3 font-semibold ${
        isLike ? "text-blue-500" : "text-slate-500"
      } flex justify-center items-center gap-2 rounded-sm hover:bg-slate-200`}
    >
      <BiLike className={`size-[20px] ${isLike ? "text-blue-500" : "text-slate-500"}`} />
      <p className="text-sm">{isLike ? "Liked" : "Like"}</p>
    </button>
  );
};
