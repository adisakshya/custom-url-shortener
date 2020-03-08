const mongoose = require('mongoose');
const validURL = require('valid-url');
const shortId = require('shortid');

/**
 * Database Controller
 */
const dbController = require('../db/controller');

/**
 * GET item by ID
 * @param {object} req
 * @param {object} res
 */
const getByID = async (req, res) => {
  
  // GET params
  const id = req.query.id;

  // CHECK if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // GET item
  const item = await dbController.getItemByID(id);
  
  // RETURN response
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
 * POST new item
 * @param {object} req 
 * @param {object} res 
 */
const createNewItem = async (req, res) => {

  // GET originalURL & baseURL
  const { originalURL, baseURL } = req.body;

  // CHECK if all parameters are given
  if(!(originalURL && baseURL)) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // CHECK if valid URL
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

  // GENERATE URL code
  const urlCode = shortId.generate();

  // Check if item with this original URL already exists
  const item = await dbController.getItemByOriginalURL(originalURL);
  if(item) {
    // return response
    return res
      .status(200)
      .json({
        'message': item
      });
  } else {
    // create a short URL
    let shortURL = baseURL + "/" + urlCode;
    
    // insert into db
    const item = await dbController.insertNewItem(originalURL, baseURL, shortURL, urlCode);
    
    // return response
    if(item) {
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
 * DELETE item by ID
 * @param {object} req
 * @param {object} res
 */
const deleteByID = async (req, res) => {
  
  // GET params
  const { id } = req.body;

  // CHECK if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        'message': 'Insufficient parameters'
      })
  }

  // GET item
  const item = await dbController.deleteItemByID(id);
  
  // RETURN response
  if(item) {
    return res
      .status(200)
      .json({
        "message": item
      });
  } else {
    return res
      .status(400)
      .json({
        "message": 'Item not found'
      });
  }
};

/**
 * 
 * @param {object} req
 * @param {object} res
 */
const getAllItems = async (req, res) => {
  
  // GET items
  const items = await dbController.getItems();

  // RETURN response
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

exports.getByID = getByID;
exports.createNewItem = createNewItem;
exports.deleteByID = deleteByID;
exports.getAllItems = getAllItems;