import axios from "axios";

export const getAdminData = async () => {
  const res = await axios.get("/api/admin", {
    withCredentials: true,
  });
  return res.data;
};

export const getStudentCount = async () => {
  const studentRes = await axios.get("/api/admin/students");
  return studentRes.data.students.length;
};

export const getPaperCount = async () => {
  const paperRes = await axios.get("/api/admin/resources?type=paper");
  return paperRes.data.resources.length;
};

export const getSubmissionsCount = async () => {
  const submissionsRes = await axios.get("/api/submissions");
  return submissionsRes.data.submissions.length;
};

export const getInquiriesCount = async () => {
  const inquiriesRes = await axios.get("/api/contact");
  return inquiriesRes.data.inquiries.length;
};
