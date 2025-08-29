import { useQuery } from "@tanstack/react-query";
import { fetchJobPosts } from "../../services/apiService";

export const useFetchAllJob = () => {
  return useQuery({
    queryKey: ["jobPosts"],
    queryFn: fetchJobPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
}