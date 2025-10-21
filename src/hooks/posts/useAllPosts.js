import { useQuery } from "react-query";
import { getPostsAPI } from "../../api/posts.api";
import { useAuth } from "@/hooks/useAuth";

export const useAllPosts = () => {
  const { token, isAxiosReady } = useAuth();
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPostsAPI,
    enabled: !!token && isAxiosReady,
  });
};
