const { PDFParse } = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/InterviewReport.model");

const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;

  if (!resumeFile) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  let resumeContent = "";
  try {
    const parser = new PDFParse({ data: resumeFile.buffer });
    const result = await parser.getText();
    resumeContent = result.text;
    await parser.destroy();
  } catch (error) {
    return res.status(500).json({ message: "Failed to parse PDF", error: String(error) });
  }

  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "interview report generated successfully",
    interviewReport,
  });
};

module.exports = { generateInterviewReportController };
