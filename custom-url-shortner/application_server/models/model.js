let shortenURL;

if(process.env.NODE_ENV === 'test') {
    console.log('>', 'Test Model Loaded');
    shortenURL = require('./testModel');
} else {
    console.log('>', 'Model Loaded');
    shortenURL = require('./testModel');
}

module.exports = shortenURL;