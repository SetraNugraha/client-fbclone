/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useQuery } from 'react-query'

export const useFetchUserById = (userId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const baseURL = import.meta.env.VITE_BASE_URL
      const userByIdResponse = await axios.get(`${baseURL}/api/users/${userId}`)

      return userByIdResponse.data.data
    },
  })

  return {
    data,
    isLoading,
    refetch,
  }
}
