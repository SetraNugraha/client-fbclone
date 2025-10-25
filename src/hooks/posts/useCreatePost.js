import { createPostAPI } from "@/api/posts.api";
import { useMutation, useQueryClient } from "react-query";

export const useCreatePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: (payload) => createPostAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log("useCreatePosts mutation error: ", error);
    },
  });
};
