/**
 * Main Controller
 * Handles redirections
 */

/**
 * Cache utility
 */
const cache = require('../../lib/cache');

/**
 * GET item by ID
 * @param {object} req
 * @param {object} res
 */
const redirectToOriginalURL = async (req, res) => {
  
  // GET params
  const code = req.params.code;

  // GET originalURL from cache
  const originalURL = await cache.get(code);
  
  // RETURN response
  if(originalURL) {
    return res
      .redirect(originalURL);
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL ID found'
      })
  }
};


exports.redirectToOriginalURL = redirectToOriginalURL;