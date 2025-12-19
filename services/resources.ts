import axios from "axios";

export const getResources = async ({
  type,
  year,
  medium,
}: {
  type: string;
  year?: string;
  medium?: string;
}) => {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (year) params.append("year", year);
  if (medium) params.append("medium", medium);

  const res = await axios.get(`/api/admin/resources?${params.toString()}`);
  return res.data.resources || [];
};

export const getMarkingSchemes = async ({
  type,
  year,
  medium,
}: {
  type: string;
  year: string;
  medium: string;
}) => {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (year) params.append("year", year);
  if (medium) params.append("medium", medium);

  const res = await axios.get(
    `/api/admin/marking-schemes?${params.toString()}`
  );
  return res.data.markings || [];
};

export const getStudentMarkingSchemes = async ({
  type,
  year,
  medium,
}: {
  type: string;
  year: string;
  medium: string;
}) => {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (year) params.append("year", year);
  if (medium) params.append("medium", medium);

  const res = await axios.get(`/api/get-marking-schemes?${params.toString()}`);
  return res.data.markings || [];
};

export const getStudentMarkedPapers = async ({
  type,
  year,
  medium,
}: {
  type: string;
  year: string;
  medium: string;
}) => {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (year) params.append("year", year);
  if (medium) params.append("medium", medium);

  const res = await axios.get(`/api/submissions?${params.toString()}`);
  return res.data.submissions || [];
};
