const mongoose = require("mongoose");

const schema = mongoose; 

const shortenURLSchema = new schema({
  originalUrl: {
    type: String,
    required: true
  },
  urlCode: {
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

mongoose.model("shortenURL", shortenURLSchema);