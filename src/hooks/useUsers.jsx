import { useQuery } from "react-query";
import { useAuth } from "@/hooks/useAuth";
import { getUserAPI } from "@/api/users.api";

export const useUsers = ({ userId } = {}) => {
  const { token } = useAuth();

  const { data: user, isLoading: userIsLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserAPI(userId, token),
    enabled: !!userId && !!token,
  });

  return { user, userIsLoading };
};
