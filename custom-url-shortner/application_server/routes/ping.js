const express = require('express');
const router = express.Router();

/**
 * Ping Route
 */
router.route('/')
  /**
   * PING application server router
   */
  .get((req, res) => {
    return res
        .status(200)
        .json({
            "message": "pong"
        });
  });

module.exports = router;
