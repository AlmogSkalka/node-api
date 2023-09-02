const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"));

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
