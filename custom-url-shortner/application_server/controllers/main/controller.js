/**
 * Main Controller
 */

/**
 * Database Controller
 */
const dbController = require('../db/controller');

/**
 * GET item by ID
 * @param {object} req
 * @param {object} res
 */
const redirectToOriginalURL = async (req, res) => {
  
  // GET params
  const code = req.params.code;

  // GET item
  const item = await dbController.getItemByCode(code);
  
  // RETURN response
  if(item) {
    return res
      .redirect(item.originalURL);
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL ID found'
      })
  }
};


exports.redirectToOriginalURL = redirectToOriginalURL;