const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**
 * Ping Router
 */
const pingRounter = require('./routes/ping');
app.use('/ping', pingRounter);

/**
 * Index Router
 */
const indexRouter = require('./routes/index');
app.use('/api/url', indexRouter);

/**
 * Main Router
 */
const mainRouter = require('./routes/main');
app.use('/', mainRouter);

/**
 * Establish connection with database
 */
require('./db/db').connect();

module.exports = app;
