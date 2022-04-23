const express = require("express");
const env = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/user");

env.config();
app.use(cors());

app.use(express.json());

connectDB();

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
