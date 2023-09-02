const mongoose = require("mongoose");
const objectSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter an object name"] },
    type: { type: String, required: true, default: null },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const objectMdl = mongoose.model("Object", objectSchema);
module.exports = objectMdl;
