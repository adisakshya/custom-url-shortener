const express = require('express');
const router = express.Router();

/**
 * Application Controller
 */
const applicationController = require('../controllers/application/controller');

/**
 * Index Route
 */
router.route('/')
  /**
   * GET all items
   */
  .get(applicationController.getAllItems)
  
  /**
   * POST new item 
   */
  .post(applicationController.createNewItem)

  /**
   * DELETE all items
   */
  .delete(applicationController.deleteAll);

/**
 * Item Route
 */
router.route('/item')
  /**
   * GET item by ID
   */
  .get(applicationController.getByID)

  /**
   * DELETE item by ID
   */
  .delete(applicationController.deleteByID);

/**
 * Item (original URL) Route
 */
router.route('/item/originalurl')
  /**
   * GET item by originalURL
   */
  .get(applicationController.getByOriginalURL);

/**
 * Item (URL Code) Route
 */
router.route('/item/urlcode')
  /**
   * GET item by URLCode
   */
  .get(applicationController.getByCode);

/**
 * Update OriginalURL Route
 */
router.route('/update/originalurl')
  /**
   * UPDATE originalURL
   */
  .put(applicationController.updateOriginalURL);

/**
 * Update URLCode Route
 */
router.route('/update/urlcode')
  /**
   * UPDATE URLCode
   */
  .put(applicationController.updateURLCode);

/**
 * Database Connection Test Route
 */
router.route('/db/connection/test')
  /**
   * CHECK connection with database
   */
  .get(applicationController.checkDBConnection);

module.exports = router;
