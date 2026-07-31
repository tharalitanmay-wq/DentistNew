const express = require('express');
const router = express.Router();
const { handleAiQuery } = require('../controllers/aiChatController');

router.post('/query', handleAiQuery);

module.exports = router;
