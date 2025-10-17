/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useMutation } from "react-query";
import { objectToFormData } from "../../utils/objectToFormData";

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
    mutationFn: async (credentials) => {
      const res = await axiosInstance.post("/auth/login", credentials, {
        withCredentials: true,
      });
      return res.data.data;
    },
    onSuccess: (data) => {
      const { access_token } = data;
      const decode = jwtDecode(access_token);

      setToken(access_token);
      setAuthUser(decode);
    },
    onError: (error) => {
      setToken(null);
      setAuthUser(null);
    },
  });

  const logout = async () => {
    const res = await axiosInstance.post("/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const refreshToken = async () => {
    const res = await axiosInstance.get("/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { access_token } = res.data.data;
    const decode = jwtDecode(access_token);
    setToken(access_token);
    setExpired(decode.exp);
    setAuthUser(decode);
    return access_token;
  };

  // Check Expired Access Token
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expired && expired * 1000 < currentDate.getTime()) {
          try {
            const newToken = await refreshToken();
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
