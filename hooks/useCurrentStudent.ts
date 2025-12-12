import { useQuery } from "@tanstack/react-query";
import { getCurrentStudent } from "@/services/dashboard.data";

export const useCurrentStudent = () => {
  return useQuery({
    queryKey: ["current-student"],
    queryFn: getCurrentStudent,
  });
};
