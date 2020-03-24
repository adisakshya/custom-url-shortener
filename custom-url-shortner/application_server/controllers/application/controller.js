/**
 * Application Controller
 * Management of URLs
 */

const validURL = require('valid-url');

/**
 * Require Database Controller
 */
const dbController = require('../db/controller');

/**
 * Require cache utility
 */
const cache = require('../../lib/cache');

/**
 * Check if connection with database is alive
 * @param {object} req 
 * @param {object} res 
 */
const checkDBConnection = async (req, res) => {

  // CHECK if connection is established
  if(await dbController.checkDB() !== 1) {
    // if not then return Status 504
    return res
      .status(504)
      .json({
        "message": "Failed to establish connection with database"
      });
  } else {
    // if yes then return Status 200 OK
    return res
      .status(200)
      .json({
        "message": "Connection with database is successfully established"
      });
  }
}

/**
 * POST new item
 * @param {object} req 
 * @param {object} res 
 */
const createNewItem = async (req, res) => {

  // Get originalURL, baseURL and URLCode
  const { originalURL, baseURL, URLCode } = req.body;

  // Check if all parameters are given
  if(!(originalURL && baseURL && URLCode)) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Check if valid URL
  if(!validURL.isUri(baseURL)) {
    return res
      .status(400)
      .json({
        'message': 'Invalid Base URL'
      });
  }
  if(!validURL.isUri(originalURL)) {
    return res
      .status(400)
      .json({
        'message': 'Invalid Original URL'
      });
  }

  // Check if URL code already exists
  const url = await dbController.getItemByCode(URLCode);
  if(url) {
    // Return response
    return res
      .status(200)
      .json({
        'message': url,
        'duplicate': 'URL Code'
      });
  }

  // Check if item with this original URL already exists
  const item = await dbController.getItemByOriginalURL(originalURL);
  if(item) {
    // Return response
    return res
      .status(200)
      .json({
        'message': item,
        'duplicate': 'Original URL'
      });
  } else {
    // Create a short URL
    let shortURL = baseURL + "/" + URLCode;
    
    // Insert into db
    const item = await dbController.insertNewItem(originalURL, baseURL, shortURL, URLCode);

    if(item) {
      // Insert item in cache
      const cacheItem = await cache.set(URLCode, originalURL);
      
      // Return response
      return res
        .status(200)
        .json({
          'message': item
        })
    } else {
      return res
        .status(500)
        .json({
          'message': 'Something went wrong'
        })
    }
  }

};

/**
 * Get all items
 * @param {object} req
 * @param {object} res
 */
const getAllItems = async (req, res) => {
  
  // Get items
  const items = await dbController.getItems();

  // Return response
  if(items.length) {
    return res
      .status(200)
      .json({
        "message": items
      });
  } else {
    return res
      .status(200)
      .json({
        "message": 'No Item found'
      });
  }
};

/**
 * GET item by ID
 * @param {object} req
 * @param {object} res
 */
const getByID = async (req, res) => {
  
  // Get params
  const id = req.query.id;

  // Check if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Get item
  const item = await dbController.getItemByID(id);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "message": item
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL ID found'
      })
  }
};

/**
 * GET item by Code
 * @param {object} req
 * @param {object} res
 */
const getByCode = async (req, res) => {
  
  // Get params
  const code = req.query.code;

  // Check if all parameters are given
  if(!code) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Get item
  const item = await dbController.getItemByCode(code);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "message": item
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL code found'
      })
  }
};

/**
 * GET item by original URL
 * @param {object} req
 * @param {object} res
 */
const getByOriginalURL = async (req, res) => {
  
  // Get params
  const originalURL = req.query.originalURL;

  // Check if all parameters are given
  if(!originalURL) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Get item
  const item = await dbController.getItemByOriginalURL(originalURL);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "message": item
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL found'
      })
  }
};

/**
 * UPDATE original URL
 * @param {object} req
 * @param {object} res
 */
const updateOriginalURL = async (req, res) => {
  
  // Get params
  const { id, originalURL } = req.body;

  // Check if all parameters are given
  if(!(id && originalURL)) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Get item
  const item = await dbController.updateItem(id, {
    'originalURL': originalURL
  });
  
  if(item) {
    // Update cache
    let URLCode = item.URLCode;
    let updatedItem = await cache.set(URLCode, originalURL);

    // Return response
    return res
      .status(200)
      .json({
        "message": item
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL found'
      })
  }
};

/**
 * UPDATE URL code
 * @param {object} req
 * @param {object} res
 */
const updateURLCode = async (req, res) => {
  
  // Get params
  const { id, URLCode } = req.body;

  // Check if all parameters are given
  if(!(id && URLCode)) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Get item
  const item = await dbController.updateItem(id, {
    'URLCode': URLCode
  });
  
  if(item) {
    // Update cache
    let originalURL = item.originalURL;
    let updatedItem = await cache.set(URLCode, originalURL);
    
    // Return response
    return res
      .status(200)
      .json({
        "message": item
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'No such URL found'
      })
  }
};

/**
 * DELETE item by ID
 * @param {object} req
 * @param {object} res
 */
const deleteByID = async (req, res) => {
  
  // Get ID
  const { id } = req.body;

  // Check if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // Get url code
  const item = await dbController.getItemByID(id);
  let itemCode = item.URLCode;

  // Delete item
  const removedItem = await dbController.deleteItemByID(id);
  // Remove from cache
  const removedCache = await cache.deleteKey(itemCode);
  
  // Return response
  if(removedItem) {
    return res
      .status(200)
      .json({
        "message": removedItem
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'Item not found'
      });
  }
};

/**
 * DELETE all items
 * @param {object} req
 * @param {object} res
 */
const deleteAll = async (req, res) => {
  
  // Get item
  const resp = await dbController.deleteAllItems();
  // Clear cache
  const temp = await cache.deleteAll();
  
  // Return response
  if(resp) {
    return res
      .status(200)
      .json({
        "message": resp
      });
  } else {
    return res
      .status(404)
      .json({
        "message": 'No item found'
      });
  }
};

exports.checkDBConnection = checkDBConnection;
exports.createNewItem = createNewItem;
exports.getAllItems = getAllItems;
exports.getByID = getByID;
exports.getByCode = getByCode;
exports.getByOriginalURL = getByOriginalURL;
exports.updateOriginalURL = updateOriginalURL;
exports.updateURLCode = updateURLCode;
exports.deleteByID = deleteByID;
exports.deleteAll = deleteAll;