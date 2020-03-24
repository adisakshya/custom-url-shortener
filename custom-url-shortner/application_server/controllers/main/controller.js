/**
 * Main Controller
 * Handles redirections
 */

/**
 * Cache utility
 */
const cache = require('../../lib/cache');

/**
 * Redirect to original URL
 * @param {object} req
 * @param {object} res
 */
const redirectToOriginalURL = async (req, res) => {
  
  // GET params
  const code = req.params.code;

  // GET originalURL from cache
  const originalURL = await cache.get(code);
  
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