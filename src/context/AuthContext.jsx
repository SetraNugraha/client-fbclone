/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setupAxiosAuth } from "@/lib/axios";
import { useMutation } from "react-query";
import { getUserAPI } from "@/api/users.api";
import { registerAPI, loginAPI, logoutAPI } from "@/api/auth.api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expired, setExpired] = useState(null);
  const [isAxiosReady, setIsAxiosReady] = useState(false);

  const register = useMutation({
    mutationFn: (payload) => registerAPI(payload),
  });

  const login = useMutation({
    mutationKey: ["user"],
    mutationFn: (credentials) => loginAPI(credentials),
    onSuccess: (data) => {
      const { access_token, user } = data;

      setToken(access_token);
      setAuthUser(user);
    },
    onError: (error) => {
      setToken(null);
      setAuthUser(null);
    },
  });

  const logout = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (data) => {
      alert(data.message);
      setToken(null);
      setAuthUser(null);
    },
    onError: (error) => {
      console.log("logout error: ", error.response?.data);
      setToken(null);
      setAuthUser(null);
    },
  });

  const refreshToken = async () => {
    try {
      const res = await axiosInstance.get("/auth/refresh-token");

      const { access_token } = res.data;
      const decode = jwtDecode(access_token);

      // Fetch User By userId
      const user = await getUserAPI(decode.sub, access_token);
      setAuthUser(user);

      setToken(access_token);
      setExpired(decode.exp);
      return access_token;
    } catch (error) {
      setToken(null);
      setAuthUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      setupAxiosAuth(token);
      setIsAxiosReady(true);
    } else {
      setIsAxiosReady(false);
    }
  }, [token]);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expired && expired * 1000 < currentDate.getTime()) {
          try {
            const newToken = await refreshToken();
            if (newToken) {
              setToken(newToken);
              config.headers.Authorization = `Bearer ${newToken}`;
            } else if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            if (error instanceof AxiosError && error.response) {
              navigate("/");
            }
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, []);

  const value = {
    token,
    authUser,
    register,
    login,
    logout,
    isAxiosReady,
    refreshToken,
    setAuthUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
