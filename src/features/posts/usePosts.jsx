import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../auth/useAuth";
import { axiosInstance } from "../../lib/axios";
import { objectToFormData } from "../../utils/objectToFormData";

export const usePosts = ({ userId } = {}) => {
  const { authUser, token } = useAuth();
  const queryClient = useQueryClient();

  // GET All Posts
  const { data: posts, isLoading: postsIsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post/all");

      return res.data.data;
    },
  });

  // GET Posts by userId
  const { data: userPosts, isLoading: userPostsIsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey;
      const res = await axiosInstance.get(`/post/${userId}`);

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
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const createComment = useMutation({
    mutationKey: ["posts"],
    mutationFn: async ({ postId, body }) => {
      const res = await axiosInstance.post(`/post/${postId}/comment/create`, { body });
      return res.data.data;
    },
    onMutate: async ({ postId, body }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update
      queryClient.setQueryData(["posts"], (oldPost) => {
        return oldPost.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(), // temporary ID
                  body: body,
                  user: authUser,
                  created_at: new Date().toISOString(),
                },
              ],
            };
          }
          return post;
        });
      });

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => {
      // Refetch to ensure data is correct
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts,
    postsIsLoading,
    userPosts,
    userPostsIsLoading,
    createPost,
    createComment,
  };
};
