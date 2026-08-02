const { PDFParse } = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/InterviewReport.model");
const appCache = require("../config/cache");

const generateInterviewReportController = async (req, res) => {
  try {
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

    appCache.set(`report_${req.user.id}_${interviewReport._id}`,interviewReport,3600)


    res.status(201).json({
      message: "interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to generate interview report", error: String(error) });
  }
};

const getInterviewReportById = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const cacheKey = `report_${req.user.id}_${interviewId}`
   const cachedReport = appCache.get(cacheKey)

   if(cachedReport){
    return res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport:cachedReport
    });
   }
    const interviewReport = await interviewReportModel.findOne({ _id: interviewId,user:req.user.id });

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found" });
    }

    appCache.set(cacheKey,interviewReport,3600)

    res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch interview report", error: String(error) });
  }
};

const getAllInterviewReports = async (req, res) => {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
      message: "Interview reports fetched successfully",
      interviewReports,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch interview reports", error: String(error) });
  }
};

const generateResumePdfController = async (req, res) => {
  try {
    const { interviewReportId } = req.params;

    const cacheKey = `report_${req.user.id}_${interviewReportId}`
    let interviewReport = appCache.get(cacheKey)

    if(!interviewReport){
      interviewReport = await interviewReportModel.findOne({
      _id: interviewReportId,
      user: req.user.id,
    });
    }

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found" });
    }

    appCache.set(cacheKey,interviewReport,3600)

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to generate resume PDF", error: String(error) });
  }
};

module.exports = { generateInterviewReportController, getInterviewReportById, getAllInterviewReports, generateResumePdfController };
