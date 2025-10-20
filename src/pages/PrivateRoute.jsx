/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingOverlay } from "../elements/LoadingOverlay";

const PrivateRoute = () => {
  const { authUser, token, refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error("PrivateRoute Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  if (!token || !authUser) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
