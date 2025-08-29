import { useMutation } from "@tanstack/react-query";
import { postJob } from "../../services/apiService";


export const useAddJobPost = () => {
  return useMutation({
    mutationFn: (jobData) => postJob(jobData),
  });
};
