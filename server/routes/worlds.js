// server/routes/worlds.js

const express = require('express');
const router = express.Router();

// Import all the controller functions this route will use
const { 
    getAllWorlds, 
    createWorld, 
    getOneWorld, 
    createArticle, 
    createMapPin, 
    createTimelineEvent 
} = require('../controllers/worldController');

// Import the authentication middleware
const { isAuthenticated } = require('../middleware/authMiddleware');

// IMPORTANT: Apply the authentication middleware to ALL routes in this file.
// This means a user must be logged in to access any of these endpoints.
router.use(isAuthenticated);


// Route for GET /api/worlds and POST /api/worlds
router.route('/')
    .get(getAllWorlds)
    .post(createWorld);

// Route for GET /api/worlds/:worldId
router.route('/:worldId')
    .get(getOneWorld);

// --- Sub-document routes ---

// Route for POST /api/worlds/:worldId/articles
router.post('/:worldId/articles', createArticle);

// Route for POST /api/worlds/:worldId/mappins
router.post('/:worldId/mappins', createMapPin);

// Route for POST /api/worlds/:worldId/timeline
router.post('/:worldId/timeline', createTimelineEvent);


// Export the router so server.js can use it
module.exports = router;