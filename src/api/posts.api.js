import { axiosInstance } from "@/lib/axios";
import { objectToFormData } from "@/utils/objectToFormData";

export const getPostsAPI = async () => {
  const res = await axiosInstance.get("/post/all");
  return res.data.data || [];
};

export const getPostsUserAPI = async (userId) => {
  const res = await axiosInstance.get(`/post/${userId}`);
  const { author, posts } = res.data.data;
  return { author, posts };
};

export const createPostAPI = async (payload) => {
  const { ...fields } = payload;
  const formData = objectToFormData(fields);
  const res = await axiosInstance.post("/post/create", formData);

  return res.data.data;
};
