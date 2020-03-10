/**
 * Establish connection
 * with MongoDB Atlas Cluster
 * using connection string
 */

const mongoose = require("mongoose");

/**
 * Get connection string
 */
const config = require("../config/config.json");
const dbURI = config.mongoURI;

/**
 * Connection Options
 */
const connectOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.Promise = global.Promise;

/**
 * Connect to DB
 */
mongoose.connect(dbURI, connectOptions, (err, db) => {
  if (err) console.log('Error', err);
  console.log('>', 'Connected to MongoDB');
});