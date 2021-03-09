const mongoose = require("mongoose");

const Books_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

mongoose.set("useFindAndModify", false);

module.exports = mongoose.model("Books", Books_Schema);
