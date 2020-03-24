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
   * GET item by ID
   */
  .get(applicationController.getByID)
  
  /**
   * POST new item 
   */
  .post(applicationController.createNewItem)

  /**
   * DELETE item by ID
   */
  .delete(applicationController.deleteByID);

/**
 * All Route
 */
router.route('/all')
  /**
   * GET all items
   */
  .get(applicationController.getAllItems)

  /**
   * DELETE all items
   */
  .delete(applicationController.deleteAll);


/**
 * Database Test Route
 */
router.route('/db/connection/test')
  /**
   * GET database connection status
   */
  .get(applicationController.checkDBConnection);

/**
 * Database Test Route
 */
router.route('/update/originalURL')
  /**
   * GET database connection status
   */
  .put(applicationController.updateOriginalURL);


router.route('/update/URLCode')
  /**
   * GET database connection status
   */
  .put(applicationController.updateURLCode);

module.exports = router;
