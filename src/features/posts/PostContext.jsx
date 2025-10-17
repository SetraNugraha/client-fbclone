/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { useAuth } from "../auth/useAuth";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { token, axiosJWT } = useAuth();

  const useFetchPosts = (userId) => {
    const { data, isLoading, refetch } = useQuery({
      queryKey: ["posts", userId],
      queryFn: async () => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const endpoint = userId ? `${baseURL}/api/posts/${userId}` : `${baseURL}/api/posts`;
        try {
          const postsResponse = await axios.get(endpoint);
          return postsResponse.data.data || [];
        } catch (error) {
          console.log("error fetch posts: ", error);
          return [];
        }
      },
    });

    return {
      data,
      isLoading,
      refetch,
    };
  };

  const useCreatePost = ({ onSuccess, onError }) => {
    return useMutation({
      mutationFn: async (data) => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const postsResponse = await axiosJWT.post(`${baseURL}/api/posts`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        return postsResponse;
      },
      onSuccess,
      onError,
    });
  };

  const useCreateComment = ({ onSuccess }) => {
    return useMutation({
      mutationFn: async (data) => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const commentResponse = await axiosJWT.post(`${baseURL}/api/posts/comments`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return commentResponse;
      },
      onSuccess,
    });
  };

  const useCreateLike = ({ onSuccess }) => {
    return useMutation({
      mutationFn: async ({ postId, userId, initialLiked }) => {
        if (!postId || !userId) {
          throw Error("postId or userId is missing");
        }

        const method = initialLiked ? "delete" : "post";
        const baseURL = import.meta.env.VITE_BASE_URL;
        const likeResponse = await axiosJWT({
          method,
          url: `${baseURL}/api/posts/${postId}/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return likeResponse;
      },
      onSuccess,
    });
  };

  const value = {
    useFetchPosts,
    useCreatePost,
    useCreateComment,
    useCreateLike,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContext;
