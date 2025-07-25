const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getEvents, createEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', auth, createEvent);

module.exports = router;
