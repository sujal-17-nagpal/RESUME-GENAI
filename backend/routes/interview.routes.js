const express = require("express");
const { isAuth } = require("../middlewares/auth.middleware");
const {
  generateInterviewReportController,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdfController,
} = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  isAuth,
  upload.single("resume"),
  generateInterviewReportController,
);

interviewRouter.get("/", isAuth, getAllInterviewReports);

interviewRouter.get("/:interviewReportId/resume-pdf", isAuth, generateResumePdfController);

interviewRouter.get("/:interviewId", isAuth, getInterviewReportById);

module.exports = interviewRouter;
