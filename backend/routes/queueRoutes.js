const express = require('express');
const router = express.Router();
const {
  getTodayQueue,
  createQueueEntry,
  updateTreatedStatus,
  deleteQueueEntry
} = require('../controllers/queueController');

router.get('/today', getTodayQueue);
router.post('/', createQueueEntry);
router.put('/:id/status', updateTreatedStatus);
router.delete('/:id', deleteQueueEntry);

module.exports = router;
