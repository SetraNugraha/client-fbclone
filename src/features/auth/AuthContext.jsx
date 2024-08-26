/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAxiosJWT } from './useAxiosJWT'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const [token, setToken] = useState(null)
  const [expired, setExpired] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_BASE_URL

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/token`)
      const { accessToken } = response.data
      const decoded = jwtDecode(accessToken)
      setAuthUser(decoded)
      setToken(accessToken)
      setExpired(decoded.exp)
    } catch (error) {
      if (error.response) {
        navigate('/')
      }
    }
  }

  const axiosJWT = useAxiosJWT(baseURL, expired, setAuthUser, setToken, setExpired)

  const handleLogin = async (email, password, setMsg) => {
    setLoginLoading(true)
    try {
      const response = await axios.post(`${baseURL}/api/login`, {
        email,
        password,
      })
      const { accessToken } = response.data
      setToken(accessToken)
      const decoded = jwtDecode(accessToken)
      setAuthUser(decoded)

      navigate('/homepage')
    } catch (error) {
      setAuthUser(null)
      setMsg(error.response.data.msg)
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      await axios.delete(`${baseURL}/api/logout`)
      navigate('/')
    } catch (error) {
      console.log(error)
      navigate('/')
    } finally {
      setLogoutLoading(false)
    }
  }

  const value = {
    token,
    axiosJWT,
    authUser,
    loginLoading,
    logoutLoading,
    refreshToken,
    handleLogin,
    handleLogout,
    setAuthUser,
    setToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
