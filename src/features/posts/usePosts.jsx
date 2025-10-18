import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../auth/useAuth";
import { axiosInstance } from "../../lib/axios";
import { objectToFormData } from "../../utils/objectToFormData";

export const usePosts = ({ userId } = {}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // GET All Posts
  const { data: posts, isLoading: postsIsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });

  // GET Posts by userId
  const { data: userPosts, isLoading: userPostsIsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey;
      const res = await axiosInstance.get(`/post/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
    enabled: !!userId,
  });

  // POST Create new post
  const createPost = useMutation({
    mutationKey: ["posts"],
    mutationFn: async (payload) => {
      const { ...formCreatePost } = payload;
      const formData = objectToFormData(formCreatePost);

      const res = await axiosInstance.post("/post/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts,
    postsIsLoading,
    userPosts,
    userPostsIsLoading,
    createPost,
  };
};
