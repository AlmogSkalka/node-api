const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const mongoose = require("mongoose");

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  throw new Error("regular get not working");
});
app.get("/blobing", (req, res) => {
  res.send("blobing something!");
  throw new Error("blobing get not working");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(
    `mongodb+srv://admin:<${process.env.mongodb_server_psw}>@cluster0.re7mxaa.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected!"));
