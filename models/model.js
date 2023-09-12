const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

let model = mongoose.model("crud_db", schema);

module.exports = model;
