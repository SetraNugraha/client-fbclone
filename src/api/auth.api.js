import { axiosInstance } from "@/lib/axios";
import { objectToFormData } from "@/utils/objectToFormData";

export const registerAPI = async (payload) => {
  const { ...fields } = payload;
  const formData = objectToFormData(fields);

  const res = await axiosInstance.post("/auth/register", formData);
  return res.data.data;
};

export const loginAPI = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  return res.data.data;
};

export const logoutAPI = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const refreshTokenAPI = async () => {
  const res = await axiosInstance.get("/auth/refresh-token");
  return res.data.accessToken;
};
