var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.route('/')
  /**
   * Render Index Page
   */
  .get((req, res, next) => {
    res.render('index', { 
      title: 'Custom URL Shortener',
      duplicate: null, 
      shortURL: null,
      error: null
    });
  })
  .post(async (req, res, next) => {
    const { originalURL, baseURL, URLCode } = req.body;
    await axios
      .post('http://192.168.99.100:3000/api/url', {
        'originalURL': originalURL,
        'baseURL': baseURL,
        'URLCode': URLCode
      })
      .then(response => {
        res.render('index', { 
          title: 'Result | Custom URL Shortener', 
          duplicate: response.data.duplicate, 
          shortURL: response.data.message.shortURL,
          error: null
        });
      })
      .catch(error => {
        res.render('index', { 
          title: 'Custom URL Shortener', 
          duplicate: null, 
          shortURL: null,
          error: error.response.data.message
        });
      });
  });

module.exports = router;
