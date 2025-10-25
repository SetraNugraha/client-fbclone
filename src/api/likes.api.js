import { axiosInstance } from "@/lib/axios";

export const toggleLikesAPI = async (postId) => {
  const res = await axiosInstance.post(`/post/${postId}/like/toggle`);
  return res.data.data;
};
