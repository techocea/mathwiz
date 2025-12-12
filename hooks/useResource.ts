import { getResources } from "@/services/resources";
import { useQuery } from "@tanstack/react-query";

export const useResources = ({
  type,
  year,
  medium,
}: {
  type: string;
  year?: string;
  medium?: string;
}) => {
  return useQuery({
    queryKey: ["resources", type, year, medium],
    queryFn: () => getResources({ type, year, medium }),
    enabled: Boolean(type && year && medium),
  });
};
