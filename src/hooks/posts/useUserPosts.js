import { useQuery } from "react-query";
import { getPostsUserAPI } from "../../api/posts.api";

export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["post", userId],
    queryFn: ({ queryKey }) => getPostsUserAPI(queryKey[1]),
    enabled: !!userId,
  });
};
