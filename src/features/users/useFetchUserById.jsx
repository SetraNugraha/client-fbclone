/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { axiosInstance } from "../../lib/axios";
import { useAuth } from "../auth/useAuth";

export const fetchUserById = async (userId, token) => {
  const res = await axiosInstance.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const useFetchUserById = (userId) => {
  const { token } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId, token),
    enabled: !!userId && !!token,
  });

  return {
    data,
    isLoading,
    error,
  };
};
