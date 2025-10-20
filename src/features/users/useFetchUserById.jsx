/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { axiosInstance } from "../../lib/axios";

export const fetchUserById = async (userId, token) => {
  const res = await axiosInstance.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const useFetchUserById = (userId, token) => {
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
