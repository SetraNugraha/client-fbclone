/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { LoadingOverlay } from "../../elements/LoadingOverlay";

const PrivateRoute = () => {
  const { authUser, token, refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await refreshToken();
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  if (!token || !authUser) {
    return <Navigate to={"/"} replace />;
  }

  return authUser && token ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;
