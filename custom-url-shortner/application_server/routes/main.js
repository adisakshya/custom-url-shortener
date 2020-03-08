const express = require('express');
const router = express.Router();

/**
 * Main Controller
 */
const mainController = require('../controllers/main/controller');

/**
 * Index Route
 */
router.route('/:code')
  /**
   * GET item by ID
   */
  .get(mainController.redirectToOriginalURL)
  
  /**
   * POST new item 
   */
  .post(mainController.redirectToOriginalURL)

module.exports = router;
