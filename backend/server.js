require("dotenv").config();
const connectDb = require("./config/db");
const app = require("./src/app");

connectDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

