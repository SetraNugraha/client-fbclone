/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Navbar from "../components/homepage/Navbar";
import { HeaderProfile } from "../components/profile/HeaderProfile";
import { LeftContent } from "../components/profile/LeftContent";
import { RightContent } from "../components/profile/RightContent";
import CardPost from "../components/homepage/CardPost";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import { LoadingOverlay } from "../elements/LoadingOverlay";
import { useEffect } from "react";
import { useUserPosts } from "../hooks/posts";

export default function Profile() {
  const { authUser } = useAuth();
  const { userId } = useParams();
  const { data: postsUser, isLoading: postsUserIsLoading } = useUserPosts(userId);
  const { user, isLoading } = useUsers({ userId: userId });

  const isOwnProfile = authUser.id == userId;

  return (
    <>
      <LoadingOverlay isLoading={isLoading && postsUserIsLoading} />

      <div className="w-full h-dvh flex flex-col bg-slate-200 overflow-y-auto">
        {/* Navbar */}
        <div>
          <Navbar authUser={authUser} />
        </div>

        <div className="bg-white border-b border-slate-300 pt-20">
          <div className="w-[65%] mx-auto ">
            {/* Header */}
            {isOwnProfile ? <HeaderProfile user={authUser} /> : <HeaderProfile user={user} />}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[65%] mx-auto mt-10">
          <div className="flex gap-x-3">
            {/* Left */}
            <div className="w-[40%] mb-5">
              <div className="flex flex-col">
                <LeftContent userId={userId} />
              </div>
            </div>

            {/* Right */}
            <div className="w-[60%] overflow-y-auto">
              <div className="flex flex-col">
                {isOwnProfile && <RightContent user={authUser} />}

                {postsUserIsLoading ? (
                  <p className=" mt-7 text-center text-slate-400 font-semibold">Loading ...</p>
                ) : (
                  postsUser?.posts.map((post, index) => {
                    const isLastPost = index === postsUser?.posts.length - 1;
                    return <CardPost key={index} author={postsUser?.author} post={post} isLastPost={isLastPost} />;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
