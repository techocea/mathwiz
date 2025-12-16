import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "@/services/submissions";

export const useSubmissions = ({
  type,
  year,
  medium,
}: {
  type: string;
  year: string;
  medium: string;
}) => {
  return useQuery({
    queryKey: ["submissions", type, year, medium],
    queryFn: () => getSubmissions({ type, year, medium }),
    enabled: Boolean(type && year && medium),
  });
};
