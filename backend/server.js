require("dotenv").config();
const connectDb = require("./config/db");
const app = require("./src/app");
const invokeGeminiAi = require("./services/ai.service");

connectDb();
invokeGeminiAi();

app.listen(3000, () => {
  console.log("server running on port 3000");
});
