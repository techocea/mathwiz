import axios from "axios";

export const getPaperResources = async ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  const result = await axios.get(
    `/api/admin/resources?type=paper&year=${year}&medium=${medium}`
  );
  return result.data.resources;
};

export const getSpeedPaperResources = async ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  const result = await axios.get(
    `/api/admin/resources?type=speed-paper&year=${year}&medium=${medium}`
  );
  return result.data.resources;
};

export const getMiniExamResources = async ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  const result = await axios.get(
    `/api/admin/resources?type=mini-exam&year=${year}&medium=${medium}`
  );
  return result.data.resources;
};

export const getHomeworkResources = async ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  const result = await axios.get(
    `/api/admin/resources?type=homework&year=${year}&medium=${medium}`
  );
  return result.data.resources;
};

export const getWorksheetResources = async ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  const result = await axios.get(
    `/api/admin/resources?type=worksheet&year=${year}&medium=${medium}`
  );
  return result.data.resources;
};
