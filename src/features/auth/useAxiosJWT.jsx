import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

/* eslint-disable no-unused-vars */
export const useAxiosJWT = ({ baseURL, expired, setAuthUser, setToken, setExpired }) => {
  const navigate = useNavigate()
  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()
      if (expired * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get(`${baseURL}/api/token`)
          const { accessToken } = response.data
          config.headers.Authorization = `Bearer ${accessToken}`
          const decoded = jwtDecode(accessToken)
          setToken(accessToken)
          setExpired(decoded.exp)
          setAuthUser(decoded)
        } catch (error) {
          if (error.response) {
            navigate('/')
          }
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return axiosJWT
}
