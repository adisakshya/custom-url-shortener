const mongoose = require("mongoose");
const config = require("../config/config.json");
const dbURI = config.mongoURI;

const connectOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.Promise = global.Promise;

mongoose.connect(dbURI, connectOptions, (err, db) => {
  if (err) console.log('Error', err);
  console.log('Connected to MongoDB');
});