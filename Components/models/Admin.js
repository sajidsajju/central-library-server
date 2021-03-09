const mongoose = require("mongoose");

const admin_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  BooksHistory: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
    },
  ],
});

mongoose.set("useFindAndModify", false);

module.exports = mongoose.model("Admin", admin_Schema);
