import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditJobPost } from "../../services/apiService";

export const useUpdateSingleJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => EditJobPost(formData),
    onSuccess: () => {
      console.log("Job updated successfully");
      queryClient.invalidateQueries(["SingleJob"]); // Correctly invalidate cache by query key
    },
    onError: (error) => {
      console.error("Failed to update job", error);
    },
  });
};
