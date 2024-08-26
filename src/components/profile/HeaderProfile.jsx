/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FaPen, GoPlus } from '../../assets/icons'
import { menu } from '../../dummyData/dummyData'
import { friendsImage } from '../../dummyData/dummyData'
import { useFormik } from 'formik'
import { useUpdateProfileImage } from '../../features/users/useUpdateProfileImage'
import { useAuth } from '../../features/auth/useAuth'
import Modal from '../../elements/Modal'

export const HeaderProfile = ({ user }) => {
  const { authUser, axiosJWT, token } = useAuth()
  const { id: userId, first_name, surname, profile_image } = user
  const isOwnProfile = authUser.id === userId

  const username = first_name + ' ' + surname

  const profileImageURL = import.meta.env.VITE_URL_PROFILE_IMAGE
  const ProfileImage = profile_image ? `${profileImageURL}/${profile_image}` : '/img/profile-default.jpg'

  const [modalUpdateProfileImage, setModalUpdateProfileImage] = useState(false)
  const [fileName, setFileName] = useState(null)

  const handleModal = () => {
    setModalUpdateProfileImage(false)
    formik.setFieldValue('post_image', null)
    setFileName(null)
    document.getElementById('profileImage').value = null
  }

  const handleUpdateProfileImage = (event) => {
    const file = event.target.files[0]
    if (file) {
      // file type
      if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
        alert('Invlaid file type, please select a jpg, jpeg, or png image')
        return
      }

      // max size 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be < 5MB')
        return
      }

      formik.setFieldValue('profile_image', file)
      setFileName(file.name)
    }
  }

  const handleRemoveFileUpdateProfileImage = () => {
    formik.setFieldValue('post_image', null)
    setFileName(null)
    document.getElementById('profileImage').value = null
  }

  const updateProfileImage = useUpdateProfileImage({
    onSuccess: () => {
      alert('Update profile image Success')
      setFileName(null)
      setModalUpdateProfileImage(false)
      window.location.reload()
    },
  })

  const formik = useFormik({
    initialValues: {
      id: '',
      profile_image: null,
    },
    onSubmit: (values, { resetForm }) => {
      const updateProfileImageData = new FormData()
      updateProfileImageData.append('id', parseInt(authUser.id))

      if (values.profile_image) {
        updateProfileImageData.append('profile_image', values.profile_image)
      }

      updateProfileImage.mutate(updateProfileImageData)
      resetForm()
    },
  })

  const deleteProfileImage = async () => {
    const confirmDelete = window.confirm('are you sure want to delete profile image ?')
    if (confirmDelete) {
      const baseURL = import.meta.env.VITE_BASE_URL
      try {
        await axiosJWT.delete(`${baseURL}/users/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        alert('Profile Image Delete Successfuly')
        setModalUpdateProfileImage(false)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Delete Cancelled !')
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col">
        {/* Profile */}
        <div className="flex items-center gap-x-7 border-b-[1px] border-slate-400 pb-5">
          {/* Profile Image */}
          <div className="w-[20%]">
            <img
              src={ProfileImage}
              alt=""
              className="rounded-full w-[150px] h-[150px] hover:opacity-70"
            />
          </div>
          {/* Name & Total Friend */}
          <div className="mt-5 w-[80%] flex justify-between items-end">
            <div className="flex flex-col gap-y-3 relative right-[90px]">
              {/* Name */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{username ? username : 'Unknow'}</h1>
                <p className="font-semibold">14 Total Teman</p>
              </div>
              {/* Friend Image */}
              <div className="flex">
                {friendsImage.map((item, index) => (
                  <img
                    key={index}
                    src={`/img/${item}`}
                    alt=""
                    className="rounded-full w-[33px] h-[33px] hover:opacity-70 -mr-2"
                  />
                ))}
              </div>
            </div>

            {/* Button story & edit */}
            {isOwnProfile && (
              <div className="flex gap-x-2">
                <button className="px-3 py-2 flex gap-x-2 items-center bg-blue-600 text-white font-semibold rounded-md hover:brightness-125">
                  <span>
                    <GoPlus className="w-[23px] h-[23px]" />
                  </span>
                  Tambahkan ke cerita
                </button>
                <button
                  onClick={() => setModalUpdateProfileImage(true)}
                  className="px-3 py-2 flex gap-x-2 items-center bg-gray-200 font-semibold rounded-md hover:bg-gray-300"
                >
                  <span>
                    <FaPen className="w-[15px] h-[15px]" />
                  </span>
                  Edit profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Open Modal */}
        {modalUpdateProfileImage && (
          <Modal>
            <Modal.Header
              title="Update Profile Image"
              onClick={handleModal}
            />
            <Modal.Body>
              {/* Button Delete Profile Image */}
              {profile_image && (
                <button
                  onClick={deleteProfileImage}
                  className="px-2 py-1 text-white bg-red-500 rounded-lg font-semibold text-[12px]"
                >
                  Delete
                </button>
              )}
              {/* END Button Delete Profile Image */}

              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-center items-center gap-y-5 mt-5"
              >
                <input
                  type="file"
                  id="profileImage"
                  name="profile_image"
                  onChange={handleUpdateProfileImage}
                  className="hidden"
                />
                {/* Profile Image Section */}
                <label htmlFor="profileImage">
                  <img
                    src={ProfileImage}
                    alt=""
                    className="rounded-full w-[300px] h-[300px] cursor-pointer hover:opacity-70 border border-slate-400"
                  />
                </label>
                {/* END Profile Image Section */}

                {fileName && (
                  <div className=" mb-2 ml-1 flex gap-x-2 items-center">
                    <p className="font-semibold text-xs text-slate-700 bg-slate-300 px-2 py-1 inline-block rounded-md">{fileName}</p>

                    {/* Button Remove File Image */}
                    <button
                      onClick={handleRemoveFileUpdateProfileImage}
                      className="text-red-500 font-semibold"
                    >
                      x
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={fileName === null}
                  className="bg-blue-500 text-white font-semibold w-full p-2 mb-3 rounded-lg disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-opacity-70"
                >
                  Update Profile
                </button>
              </form>
            </Modal.Body>
          </Modal>
        )}

        {/* Menu */}
        <div className="flex gap-x-3 items-center">
          <a
            href="#"
            className="font-semibold text-blue-600 border-b-[2px] border-blue-600 hover:bg-slate-200 hover:rounded-lg mt-1 p-3"
          >
            Postingan
          </a>
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex gap-x-3"
            >
              <a
                href={item.path}
                className="font-semibold p-3 hover:bg-slate-200 hover:rounded-lg mt-1"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
