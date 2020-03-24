/**
 * Application Controller
 * Management of URLs
 */

const validURL = require('valid-url');

/**
 * Require Database Controller
 */
const dbController = require('../../lib/dbInterface');

/**
 * Require cache utility
 */
const cache = require('../../lib/cache');

/**
 * @api {get} /api/v1/url/db/connection/test check connection with database
 * @apiVersion 1.0.0
 * @apiName check connection with database
 * @apiGroup admin
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/url/db/connection/test
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Connection with database is successfully established",
 *      "data": null
 * }
 */
const checkDBConnection = async (req, res) => {

  // CHECK if connection is established
  if(await dbController.checkDB() !== 1) {
    // if not then return Status 504
    return res
      .status(504)
      .json({
        "success": false,
        "error": true,
        "message": "Failed to establish connection with database",
        "data": null
      });
  } else {
    // if yes then return Status 200 OK
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        "message": "Connection with database is successfully established",
        "data": null
      });
  }
}

/**
 * @api {post} /api/v1/url create new entry for shorten url
 * @apiVersion 1.0.0
 * @apiName create new entry for shorten url
 * @apiGroup admin
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/url
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "New shorten url entry created",
 *      "data": {
 *        "url": {
 *           "_id": "5e7a33a638b79200123772a1",
 *           "originalURL": "https://www.google.co.in",
 *           "shortURL": "http://<domain>/google",
 *           "URLCode": "google",
 *           "createdAt": "2020-03-24T16:21:58.953Z",
 *           "updatedAt": "2020-03-24T16:21:58.953Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const createNewItem = async (req, res) => {

  // Get originalURL, baseURL and URLCode
  const { originalURL, baseURL, URLCode } = req.body;

  // Check if all parameters are given
  if(!(originalURL && baseURL && URLCode)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Check if valid URL
  if(!validURL.isUri(baseURL)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Invalid Base URL",
        "data": null
      });
  }
  if(!validURL.isUri(originalURL)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Invalid Original URL",
        "data": null
      });
  }

  // Check if URL code already exists
  const url = await dbController.getItemByCode(URLCode);
  if(url) {
    // Return response
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        "message": "URL code already exists",
        "data": {
          "url": url,
          "duplicate": "URL Code"
        }
      });
  }

  // Check if item with this original URL already exists
  const item = await dbController.getItemByOriginalURL(originalURL);
  if(item) {
    // Return response
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        "message": "Original URL already exists",
        "data": {
          "url": item,
          "duplicate": "URL Code"
        }
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
          "success": true,
          "error": false,
          "message": "New shorten url entry created",
          "data": {
            "url": item,
          }
        })
    } else {
      return res
        .status(500)
        .json({
          "success": false,
          "error": true,
          'message': 'Something went wrong',
          "data": null
        })
    }
  }

};

/**
 * @api {get} /api/v1/url get all shorten url entries
 * @apiVersion 1.0.0
 * @apiName get all shorten url entries
 * @apiGroup admin
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/url
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Items found",
 *      "data": {
 *         "items": [
 *             {
 *                 "_id": "5e7a33a638b79200123772a1",
 *                 "originalURL": "https://www.google.co.in",
 *                 "shortURL": "http://192.168.99.101/google",
 *                 "URLCode": "google",
 *                 "createdAt": "2020-03-24T16:21:58.953Z",
 *                 "updatedAt": "2020-03-24T16:21:58.953Z",
 *                 "__v": 0
 *             },
 *             {
 *                 "_id": "6f8b44b749c80311234883b2",
 *                 "originalURL": "https://github.com/adisakshya",
 *                 "shortURL": "http://192.168.99.101/adi",
 *                 "URLCode": "adi",
 *                 "createdAt": "2020-03-24T16:41:20.489Z",
 *                 "updatedAt": "2020-03-24T16:41:20.489Z",
 *                 "__v": 0
 *             }
 *         ]
 *       }
 * }
 */
const getAllItems = async (req, res) => {
  
  // Get items
  const items = await dbController.getItems();

  // Return response
  if(items.length) {
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "Items found",
        "data": {
          "items": items
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": 'No Items found',
        "data": null
      });
  }
};

/**
 * @api {get} /api/v1/url/item get shorten url details by ID
 * @apiVersion 1.0.0
 * @apiName get shorten url details by ID
 * @apiGroup admin
 * 
 * @apiParam {String} id Shorten URL Entry ID
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/url/item?id=ShortenURLEntryID
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "URL ID found",
 *      "data": {
 *        "url": {
 *           "_id": "6f8b44b749c80311234883b2",
 *           "originalURL": "https://github.com/adisakshya",
 *           "shortURL": "http://<domain>/adi",
 *           "URLCode": "adi",
 *           "createdAt": "2020-03-24T16:41:20.489Z",
 *           "updatedAt": "2020-03-24T16:41:20.489Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const getByID = async (req, res) => {
  
  // Get params
  const id = req.query.id;

  // Check if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        'message': 'Insufficient parameters',
        "data": null
      })
  }

  // Get item
  const item = await dbController.getItemByID(id);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "URL ID found",
        "data": {
          "url": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such URL ID found",
        "data": null
      })
  }
};

/**
 * @api {get} /api/v1/url/item/urlcode get shorten url details by URLCode
 * @apiVersion 1.0.0
 * @apiName get shorten url details by URLCode
 * @apiGroup admin
 * 
 * @apiParam {String} URLCode URLCode corresponding to shorten URL
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/url/item/urlcode?URLCode=ShortenURLCode
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "URL Code found",
 *      "data": {
 *        "url": {
 *           "_id": "6f8b44b749c80311234883b2",
 *           "originalURL": "https://github.com/adisakshya",
 *           "shortURL": "http://<domain>/adi",
 *           "URLCode": "adi",
 *           "createdAt": "2020-03-24T16:41:20.489Z",
 *           "updatedAt": "2020-03-24T16:41:20.489Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const getByCode = async (req, res) => {
  
  // Get params
  const code = req.query.code;

  // Check if all parameters are given
  if(!code) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Get item
  const item = await dbController.getItemByCode(code);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "URL Code found",
        "data": {
          "url": item
        }
      });
  } else {
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

/**
 * @api {get} /api/v1/url/item/originalurl get shorten url details by originalurl
 * @apiVersion 1.0.0
 * @apiName get shorten url details by originalurl
 * @apiGroup admin
 * 
 * @apiParam {String} originalurl Original URL corresponding to shorten URL
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/url/item/urlcode?originalurl=OriginalURL
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Original URL found",
 *      "data": {
 *        "url": {
 *           "_id": "6f8b44b749c80311234883b2",
 *           "originalURL": "https://github.com/adisakshya",
 *           "shortURL": "http://<domain>/adi",
 *           "URLCode": "adi",
 *           "createdAt": "2020-03-24T16:41:20.489Z",
 *           "updatedAt": "2020-03-24T16:41:20.489Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const getByOriginalURL = async (req, res) => {
  
  // Get params
  const originalURL = req.query.originalURL;

  // Check if all parameters are given
  if(!originalURL) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Get item
  const item = await dbController.getItemByOriginalURL(originalURL);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "Original URL found",
        "data": {
          "url": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such URL found",
        "data": null
      })
  }
};

/**
 * @api {put} /api/v1/url/update/originalurl update original URL corresponding to shorten URL
 * @apiVersion 1.0.0
 * @apiName update original URL corresponding to shorten URL
 * @apiGroup admin
 * 
 * @apiParam {String} id Shorten URL Entry ID
 * @apiParam {String} originalurl Original URL corresponding to shorten URL
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request PUT http://<domain:port>/api/v1/url/update/originalurl \
 *  --data-urlencode 'id=6f8b44b749c80311234883b2' \
 *  --data-urlencode 'originalURL=https://github.com'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "URL updated",
 *      "data": {
 *        "url": {
 *           "_id": "6f8b44b749c80311234883b2",
 *           "originalURL": "https://github.com",
 *           "shortURL": "http://<domain>/adi",
 *           "URLCode": "adi",
 *           "createdAt": "2020-03-24T16:41:20.489Z",
 *           "updatedAt": "2020-03-24T16:41:20.489Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const updateOriginalURL = async (req, res) => {
  
  // Get params
  const { id, originalURL } = req.body;

  // Check if all parameters are given
  if(!(id && originalURL)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
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
        "success": true,
        "error": false,
        'message': "URL updated",
        "data": {
          "url": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such URL found",
        "data": null
      })
  }
};

/**
 * @api {put} /api/v1/url/update/urlcode update urlcode corresponding to shorten URL
 * @apiVersion 1.0.0
 * @apiName update urlcode corresponding to shorten URL
 * @apiGroup admin
 * 
 * @apiParam {String} id Shorten URL Entry ID
 * @apiParam {String} URLCode URLCode corresponding to shorten URL
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request PUT http://<domain:port>/api/v1/url/update/urlcode \
 *  --data-urlencode 'id=6f8b44b749c80311234883b2' \
 *  --data-urlencode 'URLCode=github'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "URL updated",
 *      "data": {
 *        "url": {
 *           "_id": "6f8b44b749c80311234883b2",
 *           "originalURL": "https://github.com/adisakshya",
 *           "shortURL": "http://<domain>/adi",
 *           "URLCode": "github",
 *           "createdAt": "2020-03-24T16:41:20.489Z",
 *           "updatedAt": "2020-03-24T16:41:20.489Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const updateURLCode = async (req, res) => {
  
  // Get params
  const { id, URLCode } = req.body;

  // Check if all parameters are given
  if(!(id && URLCode)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
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
        "success": true,
        "error": false,
        'message': "URL updated",
        "data": {
          "url": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such URL found",
        "data": null
      })
  }
};

/**
 * @api {delete} /api/v1/url/item delete shorten URL entry
 * @apiVersion 1.0.0
 * @apiName delete shorten URL entry
 * @apiGroup admin
 * 
 * @apiParam {String} id Shorten URL Entry ID
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/url/item \
 *  --data-urlencode 'id=5e7a33a638b79200123772a1' \
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "URL deleted",
 *      "data": {
 *        "url": {
 *           "_id": "5e7a33a638b79200123772a1",
 *           "originalURL": "https://www.google.co.in",
 *           "shortURL": "http://<domain>/google",
 *           "URLCode": "google",
 *           "createdAt": "2020-03-24T16:21:58.953Z",
 *           "updatedAt": "2020-03-24T16:21:58.953Z",
 *           "__v": 0
 *         }
 *       }
 * }
 */
const deleteByID = async (req, res) => {
  
  // Get ID
  const { id } = req.body;

  // Check if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Get url code
  const item = await dbController.getItemByID(id);
  let itemCode = item.URLCode;

  // Delete item
  const removedItem = await dbController.deleteItemByID(id);
  
  if(removedItem) {
    // Remove from cache
    const removedCache = await cache.deleteKey(itemCode);
    
    // Return response
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "URL deleted",
        "data": {
          "url": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such URL found",
        "data": null
      });
  }
};

/**
 * @api {delete} /api/v1/url/item delete all shorten URL entries
 * @apiVersion 1.0.0
 * @apiName delete all shorten URL entries
 * @apiGroup admin
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/url
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "URL deleted",
 *      "data": {
  *        "url": {
  *           "n": 1,
  *           "ok": 1,
  *           "deletedCount": 1
 *         }
 *       }
 * }
 */
const deleteAll = async (req, res) => {
  
  // Get item
  const resp = await dbController.deleteAllItems();
  
  // Check if no items were present
  if(!resp.deletedCount) {
    return res
      .status(200)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      });
  }

  if(resp) {
    // Clear cache
    const temp = await cache.deleteAll();
    
    // Return response
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "URL deleted",
        "data": {
          "url": resp
        }
      });
  } else {
    return res
      .status(500)
      .json({
        "success": false,
        "error": true,
        "message": "Something went wrong",
        "data": null
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