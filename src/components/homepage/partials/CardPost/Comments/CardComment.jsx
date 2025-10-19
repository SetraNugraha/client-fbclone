import { RenderBodyComment } from "./RenderBodyComment";
import { Link } from "react-router-dom";

export const CardComment = ({ user, bodyComment }) => {
  return (
    <div className="bg-slate-100 max-w-[92%] mx-1 px-3 py-1 rounded-2xl">
      <div>
        <Link to={`/profile/${user.id}`} className="font-semibold text-sm">
          {user.username}
        </Link>
      </div>
      <div>
        <RenderBodyComment bodyComment={bodyComment} />
      </div>
    </div>
  );
};
