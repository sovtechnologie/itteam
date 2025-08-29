import { useQuery } from "@tanstack/react-query";
import { getSingleJob } from "../../services/apiService";

export const useGetSingleJob = (jobId) => {
  return useQuery({
    queryKey: ["SingleJob"],      // include jobId in key
    queryFn: () => getSingleJob(jobId),  // pass function, not function call
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!jobId  // optional: only run query if jobId exists
  });
};
