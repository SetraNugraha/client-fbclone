/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setupAxiosAuth } from "../../lib/axios";
import { useMutation } from "react-query";
import { objectToFormData } from "../../utils/objectToFormData";
import { fetchUserById } from "../users/useFetchUserById";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expired, setExpired] = useState(null);
  const navigate = useNavigate();

  const register = useMutation({
    mutationFn: async (payload) => {
      const { ...fieldsRegister } = payload;
      const formDataRegister = objectToFormData(fieldsRegister);

      const res = await axiosInstance.post("/auth/register", formDataRegister);
      return res.data;
    },
  });

  const login = useMutation({
    mutationKey: ["user"],
    mutationFn: async (credentials) => {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data.data;
    },
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
    mutationFn: async () => {
      const res = await axiosInstance.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
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
      const user = await fetchUserById(decode.sub, access_token);
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
    setupAxiosAuth(token);
  }, [token]);

  // Check Expired Access Token
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expired && expired * 1000 < currentDate.getTime()) {
          try {
            const newToken = await refreshToken();
            console.log("token: ", newToken);
            if (newToken) {
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
  }, [token, expired]);

  const value = {
    token,
    authUser,
    register,
    login,
    logout,
    refreshToken,
    setAuthUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
