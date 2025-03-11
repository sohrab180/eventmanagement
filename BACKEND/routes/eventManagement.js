const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/events', verifyToken, eventController.createEvent);
router.get('/events', verifyToken, eventController.getAllEvents);
router.get('/events/:id', verifyToken, eventController.getEventById);
router.put('/events/:id', verifyToken,  eventController.updateEvent);
router.delete('/events/:id', verifyToken, eventController.deleteEvent);

module.exports = router;
