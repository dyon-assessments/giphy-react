const express = require('express');
const GiphyController = require('../controllers/giphy-controller');

const router = express.Router();
router.post('/api/giphy', GiphyController.getGiphy);

module.exports = router;
