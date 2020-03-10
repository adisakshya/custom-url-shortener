/**
 * Database Controller
 * Interaction with database
 */

/**
 * Load model
 */
let shortenURL = require('../../models/model');

/**
 * CHeck if connection with database if established
 */
const checkDB = async() => {
  // Load database connection test
  const dbTest = require('../../db/db').connectionTest;

  // RETURN connection test result
  return dbTest();
};

/**
 * GET item by ID
 * @param {String} urlCode 
 */
const getItemByID = async (id) => {
  
  // GET item
  const item = await shortenURL.findById(id);
  
  // RETURN item
  if(item) {
    return item;
  } else {
    return false;
  }
};

/**
 * GET item by code
 * @param {String} code 
 */
const getItemByCode = async (URLCode) => {
  
  // GET item
  const item = await shortenURL.findOne({
    URLCode: URLCode
  });
  
  // RETURN item
  if(item) {
    return item;
  } else {
    return false;
  }
};

/**
 * GET item by original URL
 * @param {String} originalURL 
 */
const getItemByOriginalURL = async (originalURL) => {
  
  // GET item
  const item = await shortenURL.findOne({
    originalURL: originalURL
  });

  // RETURN item
  if(item) {
    return item;
  } else {
    return false;
  }
};

/**
 * INSERT new item
 * @param {String} originalURL 
 * @param {String} baseURL 
 * @param {String} shortURL 
 * @param {String} urlCode 
 */
const insertNewItem = async (originalURL, baseURL, shortURL, URLCode) => {
    
    // Create new item
    const item = new shortenURL({
        originalURL,
        baseURL,
        shortURL,
        URLCode
    });

    // Insert into DB
    await item.save();

    // Return item
    return item;
};

/**
 * DELETE item 
 * @param {String} id 
 */
const deleteItemByID = async (id) => {
    
  // Get item by ID
  const item = await shortenURL.findById(id);

  // Delete and return item
  if(item) {
    let removed_item = await item.remove();
    return removed_item;
  } else {
    return false;
  }
};

/**
 * GET all item 
 */
const getItems = async () => {
    
  // Get all items
  const items = await shortenURL.find();

  // Return items
  if(items) {
    return items;
  } else {
    return false;
  }
};

exports.checkDB = checkDB;
exports.getItemByID = getItemByID;
exports.getItemByCode = getItemByCode;
exports.getItemByOriginalURL = getItemByOriginalURL;
exports.insertNewItem = insertNewItem;
exports.deleteItemByID = deleteItemByID;
exports.getItems = getItems;