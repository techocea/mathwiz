import axios from "axios";
import { toast } from "sonner";
import { RegistrationFormValues } from "@/lib/validation";
import { getPaymentSlips } from "@/services/dashboard.data";
import { getStudentById, getStudents } from "@/services/students";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useStudentDetails = ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  return useQuery({
    queryKey: ["students", year, medium],
    queryFn: () => getStudents({ year, medium }),
    enabled: Boolean(year && medium),
  });
};

export const usePaymentSlips = () => {
  return useQuery({
    queryKey: ["payment-slips"],
    queryFn: () => getPaymentSlips(),
  });
};

export const useUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      studentId,
      newStatus,
    }: {
      studentId: string;
      newStatus: string;
    }) => {
      const { data } = await axios.put("/api/admin/update-status", {
        studentId,
        newStatus,
      });
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });

      toast.success("Status updated successfully");
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update status";
      toast.error(message);
    },
  });
};

export const useGetStudentById = ({ studentId }: { studentId: string }) => {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudentById(studentId),
    enabled: !!studentId,
    retry: 1,
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: RegistrationFormValues;
    }) => {
      const response = await axios.patch(`/api/admin/students/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update student");
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await axios.delete(`/api/admin/students/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted permanently");
    },
    onError: () => {
      toast.error("Failed to delete student");
    },
  });
};
