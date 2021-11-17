const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");

dotenv.config();

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Established Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

app.listen(9000, () => {
  console.log("Backend Server");
});
