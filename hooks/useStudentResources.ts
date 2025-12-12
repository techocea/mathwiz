import { getResources } from "@/services/resources";
import { useQuery } from "@tanstack/react-query";

export const useStudentResources = (type: string, student: any) => {
  return useQuery({
    queryKey: ["resources", type, student?.year, student?.medium],
    queryFn: () =>
      getResources({
        type,
        year: student.year,
        medium: student.medium,
      }),
    enabled: !!student, // run only after student loads
  });
};
