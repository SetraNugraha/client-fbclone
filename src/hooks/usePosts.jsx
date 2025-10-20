import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPostsAPI, getPostsUserAPI, createPostAPI } from "@/api/posts.api";
import { createCommentAPI } from "@/api/comments.api";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const usePosts = ({ userId } = {}) => {
  const { token, authUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: posts, isLoading: postsIsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsAPI,
    enabled: !userId && !!token,
  });

  const { data: postsUser, isLoaidng: postsUserIsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: ({ queryKey }) => getPostsUserAPI(queryKey[1]),
    enabled: !!userId && !!token,
  });

  const createPost = useMutation({
    mutationKey: ["posts"],
    mutationFn: (payload) => createPostAPI(payload),
    onSuccess: (newPost) => queryClient.setQueryData(["posts"], (old) => [newPost, ...old]),
    onError: (error) => {
      console.log("createPost error mutation: ", error);
    },
  });

  const createComment = useMutation({
    mutationKey: ["posts"],
    mutationFn: ({ postId, body }) => createCommentAPI(postId, body),
    onMutate: async ({ postId, body }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous update
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update
      queryClient.setQueryData(["posts"], (oldPosts) => {
        return oldPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
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

  return { posts, postsIsLoading, postsUser, postsUserIsLoading, createPost, createComment };
};
