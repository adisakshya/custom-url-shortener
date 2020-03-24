/**
 * Main Controller
 * Handles redirections
 */

/**
 * Cache utility
 */
const cache = require('../../lib/cache');

/**
 * @api {get} / redirect to original URL corresponding to shorten URL
 * @apiVersion 1.0.0
 * @apiName redirect to original URL corresponding to shorten URL
 * @apiGroup all
 * 
 * @apiParam {String} URLCode URLCode corresponding to shorten URL
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/:URLCode
 */
const redirectToOriginalURL = async (req, res) => {
  
  // GET params
  const URLcode = req.params.URLcode;

  // GET originalURL from cache
  const originalURL = await cache.get(URLcode);
  
  if(originalURL) {
    // Redirect to original URL
    return res
      .redirect(originalURL);
  } else {
    // Report error
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such URL code found",
        "data": null
      })
  }
};

exports.redirectToOriginalURL = redirectToOriginalURL;