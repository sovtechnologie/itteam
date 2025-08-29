import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobPost } from "../../services/apiService";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => deleteJobPost(jobId),
    onSuccess: () => {
      console.log("Job deleted successfully");
      // Invalidate or refetch related queries to update UI
      queryClient.invalidateQueries(["HomeJobs"]); // example: update job list
    },
    onError: (error) => {
      console.error("Failed to delete job", error);
    },
  });
};
