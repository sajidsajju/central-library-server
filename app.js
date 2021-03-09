const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

port = process.env.PORT || 5000;
const routes = require("./Components/routes/index");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(5000, () => {
  console.log(`server is running on port ${port}`);
});
