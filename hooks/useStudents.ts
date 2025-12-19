import { getPaymentSlips } from "@/services/dashboard.data";
import { getStudents } from "@/services/students";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

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
