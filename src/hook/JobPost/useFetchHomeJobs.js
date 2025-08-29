import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../services/apiService";

export const useHomeJobs = () => {
  return useQuery({
    queryKey: ["HomeJobs"],
    queryFn: getAllJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};
