/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "../index.css";
import Navbar from "../components/homepage/Navbar";
import Leftbar from "../components/homepage/Leftbar";
import Reels from "../components/homepage/Reels";
import CreatePost from "../components/homepage/CreatePost";
import Rightbar from "../components/homepage/Rightbar";
import CardPost from "../components/homepage/CardPost";
import { useAuth } from "@/hooks/useAuth";
import { useAllPosts } from "@/hooks/posts";

export default function Homepage() {
  const { authUser } = useAuth();
  const { data: posts, isLoading: postsIsLoading } = useAllPosts();

  return (
    <>
      <div className="w-full h-dvh flex flex-col bg-slate-200 overflow-y-auto">
        {/* Navbar */}
        <div>
          <Navbar authUser={authUser} />
        </div>
        <div className="flex justify-between h-full mt-20">
          {/* Leftbar */}
          <div className="w-1/4">
            <Leftbar authUser={authUser} />
          </div>

          {/* Center */}
          <div className="w-1/3">
            <Reels />
            <CreatePost user={authUser} />

            {/* Postingan */}
            {postsIsLoading ? (
              <p className=" mt-7 text-center text-slate-400 font-semibold">Loading ...</p>
            ) : (
              posts.map((post, index) => {
                const isLastPost = index === posts.length - 1;
                return <CardPost key={index} author={post.author} post={post} isLastPost={isLastPost} />;
              })
            )}
          </div>

          {/* Rigtbar */}
          <div className="w-1/4">
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
