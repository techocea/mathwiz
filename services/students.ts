import axios from "axios";

export const getStudents = async ({
  year,
  medium,
}: {
  year: string;
  medium: string;
}) => {
  const params = new URLSearchParams();

  if (year) params.append("year", year);
  if (medium) params.append("medium", medium);

  const res = await axios.get(`/api/admin/students?${params.toString()}`);
  return res.data.students || [];
};

export const getStudentById = async (studentId: string) => {
  const data = await axios.get(`/api/admin/students/${studentId}`);
  return data.data.student;
};
