require("dotenv").config();
const connectDb = require("./config/db");
const app = require("./src/app");
const { resume, selfDescription, jobDescription } = require("./services/temp");

const generateInterviewReport = require("./services/ai.service");

generateInterviewReport({ resume, selfDescription, jobDescription });

connectDb();

app.listen(3000, () => {
  console.log("server running on port 3000");
});
