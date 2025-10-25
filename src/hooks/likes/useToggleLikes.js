import { useMutation, useQueryClient } from "react-query";
import { toggleLikesAPI } from "../../api/likes.api";
import { useAuth } from "@/hooks/useAuth";

export const useToggleLikes = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: (postId) => toggleLikesAPI(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const prevPosts = queryClient.getQueryData(["posts"]);

      // Optismiticallt Update
      queryClient.setQueryData(["posts"], (oldPost = []) => {
        return oldPost.map((post) => {
          if (post.id === postId) {
            const isLiked = post.likes.some((like) => like.user_id === authUser.id);
            return {
              ...post,
              likes: isLiked
                ? post.likes.filter((like) => like.user_id !== authUser.id)
                : [
                    ...post.likes,
                    {
                      id: Date.now(),
                      user_id: authUser.id,
                      post_id: postId,
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
      queryClient.setQueryData(["posts"], context.prevPosts);
      console.error("toggleLike mutation error: ", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
