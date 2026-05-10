import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateInterviewReportApi = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);
    console.log("chali Interview api")
  const response = await api.post("/api/interview/", formData);
    console.log(response)
  return response.data;
};

export const getInterviewReportById = async (interviewId) => {
  const res = await api.get(`/api/interview/${interviewId}`);
  return res.data;
};

export const getAllInterviewReports = async () => {
  const res = await api.get("/api/interview/");
  return res.data;
};

export const downloadResumePdf = async (interviewReportId) => {
  const res = await api.get(`/api/interview/${interviewReportId}/resume-pdf`, {
    responseType: "blob",
  });

  // Trigger browser download
  const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `resume_${interviewReportId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};