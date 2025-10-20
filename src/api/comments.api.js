import { axiosInstance } from "@/lib/axios";

export const createCommentAPI = async (postId, body) => {
  const res = await axiosInstance.post(`/post/${postId}/comment/create`, { body });
  return res.data.data;
};
