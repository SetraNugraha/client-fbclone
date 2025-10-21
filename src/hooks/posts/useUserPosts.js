import { useQuery } from "react-query";
import { getPostsUserAPI } from "../../api/posts.api";
import { useAuth } from "@/hooks/useAuth";

export const useUserPosts = (userId) => {
  const { token, isAxiosReady } = useAuth();
  return useQuery({
    queryKey: ["post", userId],
    queryFn: ({ queryKey }) => getPostsUserAPI(queryKey[1]),
    enabled: !!userId && !!token && isAxiosReady,
  });
};
