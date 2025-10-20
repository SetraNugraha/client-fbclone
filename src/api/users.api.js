import { axiosInstance } from "@/lib/axios";

export const getUserAPI = async (userId, token) => {
  const res = await axiosInstance.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
