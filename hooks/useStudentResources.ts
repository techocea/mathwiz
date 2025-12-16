import {
  getResources,
  getStudentMarkedPapers,
  getStudentMarkingSchemes,
} from "@/services/resources";
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

export const useStudentMarkingSchemes = (type: string, student: any) => {
  return useQuery({
    queryKey: ["student-marking-schemes", type, student?.year, student?.medium],
    queryFn: () =>
      getStudentMarkingSchemes({
        type,
        year: student.year,
        medium: student.medium,
      }),
    enabled: !!student,
  });
};

export const useStudentMarkedPapers = (type: string, student: any) => {
  return useQuery({
    queryKey: ["student-marked-papers", type, student?.year, student?.medium],
    queryFn: () =>
      getStudentMarkedPapers({
        type,
        year: student.year,
        medium: student.medium,
      }),
    enabled: !!student,
  });
};
