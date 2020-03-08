const mongoose = require("mongoose");

const shortenURLSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true
  },
  URLCode: {
    type: String
  },
  shortURL: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("shortenURL", shortenURLSchema);