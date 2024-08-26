/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../index.css'
import Navbar from '../components/homepage/Navbar'
import Leftbar from '../components/homepage/Leftbar'
import Reels from '../components/homepage/Reels'
import CreatePost from '../components/homepage/CreatePost'
import Rightbar from '../components/homepage/Rightbar'
import CardPost from '../components/homepage/CardPost'
import { useAuth } from '../features/auth/useAuth'
import { usePostAction } from '../features/posts/usePostAction'
import Modal from '../elements/Modal'

export default function Homepage() {
  const { authUser, logoutLoading } = useAuth()
  const { useFetchPosts } = usePostAction()
  const { data: posts, isLoading, refetch: refetchAllPosts } = useFetchPosts()

  return (
    <>
      <div className="w-full h-dvh flex flex-col bg-slate-200 overflow-y-auto">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>
        <div className="flex justify-between h-full mt-20">
          {/* Leftbar */}
          <div className="w-1/4">
            <Leftbar authUser={authUser} />
          </div>

          {/* Center */}
          <div className="w-1/3">
            <Reels />
            <CreatePost />

            {/* Postingan */}
            {isLoading ? (
              <p className=" mt-7 text-center text-slate-400 font-semibold">Loading ...</p>
            ) : (
              <CardPost
                userId={null}
                posts={posts}
                refetchAllPosts={refetchAllPosts}
              />
            )}
          </div>

          {/* Rigtbar */}
          <div className="w-1/4">
            <Rightbar />
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
