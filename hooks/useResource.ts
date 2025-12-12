import {
  getHomeworkResources,
  getMiniExamResources,
  getPaperResources,
  getSpeedPaperResources,
  getWorksheetResources,
} from "@/services/resources";
import { ResourceFilters, ResourceType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcherMap: Record<
  ResourceType,
  (filters: Omit<ResourceFilters, "type">) => Promise<any>
> = {
  paper: getPaperResources,
  "mini-exam": getMiniExamResources,
  "speed-paper": getSpeedPaperResources,
  homework: getHomeworkResources,
  worksheet: getWorksheetResources,
};

export const useResources = ({ type, year, medium }: ResourceFilters) => {
  const fetcherFunction = fetcherMap[type];
  return useQuery({
    queryKey: ["resources", type, year, medium],
    queryFn: () => fetcherFunction({ year, medium }),
    enabled: Boolean(type && year && medium),
  });
};
