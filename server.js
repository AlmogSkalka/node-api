const express = require("express");
const app = express();
const port = 3000;
const objModel = require("./models/objectModel");
require("dotenv").config();
const mongoose = require("mongoose");
const objectMdl = require("./models/objectModel");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MongoDB Connection & Server Listening
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.mongodb_server_psw}@cluster0.re7mxaa.mongodb.net/node-api?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to mdb!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error: ", err);
  });

//routes
// GET
app.get("/", (req, res) => {
  res.send("Hello World!");
  throw new Error("regular get not working");
});

app.get("/objects", async (req, res) => {
  try {
    const tmpObjects = await objModel.find({});
    res.status(200).json({ tmpObjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/objectfinder/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const tmpObject = await objModel.find({ type: "Animal" });
    res.status(200).json({ tmpObject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/blobing", (req, res) => {
  res.send("blobing something!");
  throw new Error("blobing get not working");
});

//POST
app.post("/object", async (req, res) => {
  try {
    const tmpObject = await objModel.create(req.body);
    res.status(200).json(tmpObject);
  } catch (error) {
    console.log("Error caught in server: ", error.message);
    res.status(500), json({ message: error.message });
  }
});

//PUT
app.put("/objectupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tmpObj = await objectMdl.findByIdAndUpdate(id, req.body);
    if (!tmpObj) {
      return res
        .status(404)
        .json({ message: `cannot find any item with id${id}` });
    }
    const updatedData = await objModel.find();
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELTE
app.delete("/objectsdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tmpObj = await objModel.findByIdAndDelete(id);
    if (!tmpObj) {
      res.status(500).json({ message: "cannot find item with this id" });
    }
    res.status(200).json({ message: "Item deleted: " + tmpObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
