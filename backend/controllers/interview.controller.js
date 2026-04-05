const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");

const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;

  const resumeContent = pdfParse(resumeFile.buffer);

  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });
};

module.exports = { generateInterviewReportController };
