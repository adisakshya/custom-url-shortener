const mongoose = require("mongoose");

/**
 * Shorten URL Schema
 */
const shortenURLSchema = new mongoose.Schema({
  
  /**
   * Original URL
   */
  originalURL: {
    type: String,
    required: true
  },

  /**
   * Unique URL code/keyword
   */
  URLCode: {
    type: String,
    required: true
  },

  /**
   * Shortened URL
   */
  shortURL: {
    type: String,
    required: true
  },

  /**
   * Creation Date
   */
  createdAt: {
    type: Date,
    default: Date.now
  },

  /**
   * Updated Date
   */
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("shortenURL", shortenURLSchema);