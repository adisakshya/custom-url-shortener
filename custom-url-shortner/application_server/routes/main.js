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
   * Redirect to original URL
   */
  .get(mainController.redirectToOriginalURL)

module.exports = router;
