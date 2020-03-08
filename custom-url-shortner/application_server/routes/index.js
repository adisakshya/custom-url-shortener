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
  .get(applicationController.getAllItems);

module.exports = router;
