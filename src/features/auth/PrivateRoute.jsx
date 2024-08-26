/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

const PrivateRoute = () => {
  const { authUser, token, refreshToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      await refreshToken()
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return <div className="text-center text-slate-400 font-semibold text-xl mt-10">Loading ....</div>
  }

  return authUser && token ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/'}
      replace
    />
  )
}

export default PrivateRoute
