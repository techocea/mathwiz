import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMarkingSchemes,
  getResourceById,
  getResources,
} from "@/services/resources";

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

export const useGetResourceById = ({ resourceId }: { resourceId: string }) => {
  return useQuery({
    queryKey: ["resource", resourceId],
    queryFn: () => getResourceById(resourceId),
    enabled: !!resourceId,
    retry: 1,
  });
};

export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await axios.patch(`/api/admin/resources/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await axios.delete(`/api/admin/resources/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource deleted permanently");
    },
    onError: () => {
      toast.error("Failed to delete resource");
    },
  });
};

export const useMarkingSchemes = ({
  type,
  year,
  medium,
}: {
  type: string;
  year: string;
  medium: string;
}) => {
  return useQuery({
    queryKey: ["markings", type, year, medium],
    queryFn: () => getMarkingSchemes({ type, year, medium }),
    enabled: Boolean(type && year && medium),
  });
};

export const useDeleteMarkingSchemes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await axios.delete(`/api/admin/marking-schemes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markings"] });
      toast.success("Marking scheme deleted permanently");
    },
    onError: () => {
      toast.error("Failed to delete marking scheme");
    },
  });
};

export const useUpdateMarkingScheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await axios.patch(
        `/api/admin/marking-schemes/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markings"] });
      toast.success("Marking scheme updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });
};
