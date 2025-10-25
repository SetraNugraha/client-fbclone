import { useMutation, useQueryClient } from "react-query";
import { createCommentAPI } from "../../api/comments.api";
import { useAuth } from "@/hooks/useAuth";

export const useCreateComment = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: ({ postId, body }) => createCommentAPI(postId, body),
    onMutate: async ({ postId, body }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const prevPosts = queryClient.getQueryData(["posts"]);

      // Optimistically Update
      queryClient.setQueryData(["posts"], (oldPosts = []) => {
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

      return { prevPosts };
    },
    onError: (error, variables, context) => {
      // Rollback
      queryClient.setQueryData(["posts"], context.prevPosts);
      console.error("useCreateComment mutation error: ", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "posts" });
    },
  });
};
