/* eslint-disable no-unused-vars */
import { useMutation } from 'react-query'
import { useAuth } from '../auth/useAuth'

export const useUpdateProfileImage = ({ onSuccess }) => {
  const { authUser, token, axiosJWT } = useAuth()

  return useMutation({
    mutationFn: async (data) => {
      const baseURL = import.meta.env.VITE_BASE_URL
      const updateProfileImageResponse = await axiosJWT.put(`${baseURL}/api/users/${authUser.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return updateProfileImageResponse
    },
    onSuccess,
  })
}
