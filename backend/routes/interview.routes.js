const express = require("express");
const { isAuth } = require("../middlewares/auth.middleware");
const {
  generateInterviewReportController,
} = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  isAuth,
  upload.single("resume"),
  generateInterviewReportController,
);

module.exports = interviewRouter;
