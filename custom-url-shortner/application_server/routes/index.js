var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "error": false,
    "success": true,
    "message": "Express server started"
  });
});

module.exports = router;
