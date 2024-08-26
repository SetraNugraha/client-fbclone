/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Navbar from '../components/homepage/Navbar'
import { HeaderProfile } from '../components/profile/HeaderProfile'
import { LeftContent } from '../components/profile/LeftContent'
import { RightContent } from '../components/profile/RightContent'
import { usePostAction } from '../features/posts/usePostAction'
import CardPost from '../components/homepage/CardPost'
import { useParams } from 'react-router-dom'
import { useFetchUserById } from '../features/users/useFetchUserById'
import { useAuth } from '../features/auth/useAuth'
import Modal from '../elements/Modal'

export default function Profile() {
  const { authUser, logoutLoading } = useAuth()
  const { useFetchPosts } = usePostAction()
  const { userId } = useParams()

  // Posts
  const { data: posts, isLoading, refetch: refetchAllPostsByUserId } = useFetchPosts(userId)

  // Data User, Using for header
  const { data: userById, isLoading: loadingUserById } = useFetchUserById(userId)

  const isOwnProfile = authUser.id == userId

  if (loadingUserById) {
    return <p className=" mt-7 text-center text-slate-400 font-semibold">Loading User Profile</p>
  }

  return (
    <>
      <div className="w-full h-dvh flex flex-col bg-slate-200 overflow-y-auto">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        <div className="bg-white border-b border-slate-300 pt-20">
          <div className="w-[65%] mx-auto ">
            {/* Header */}
            {isOwnProfile ? <HeaderProfile user={authUser} /> : <HeaderProfile user={userById} />}
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
                {isOwnProfile && <RightContent userId={userId} />}

                {isLoading ? (
                  <p className=" mt-7 text-center text-slate-400 font-semibold">Loading ...</p>
                ) : (
                  <CardPost
                    userId={userId}
                    posts={posts}
                    refetchAllPosts={refetchAllPostsByUserId}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {logoutLoading && (
          <Modal>
            <Modal.Body>
              <h1 className="font-semibold text-center p-3 italic">Sedang Proses Logout, Mohon Tunggu Sebentar ....</h1>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  )
}
