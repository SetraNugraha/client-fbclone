import { useMutation } from 'react-query'
import axios from 'axios'

export const useRegister = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const baseURL = import.meta.env.VITE_BASE_URL
      const registerResponse = await axios.post(`${baseURL}/api/register`, data)
      return registerResponse
    },
    onError,
    onSuccess,
  })
}
