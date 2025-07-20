const express = require('express');
const router = express.Router();

// This line is causing the error. It needs to find the `controllers` folder
// by going up one level from `routes` (../) and then down into `controllers`.
const { register, login, verify } = require('../controllers/authController');

// This line does the same thing for the middleware folder.
const { isAuthenticated } = require('../middleware/authMiddleware');

// --- Public Routes ---
// http://localhost:5005/api/auth/register
router.post('/register', register);

// http://localhost:5005/api/auth/login
router.post('/login', login);


// --- Protected Route ---
// This route will first run the isAuthenticated middleware.
// If the token is valid, it will then run the verify controller.
// http://localhost:5005/api/auth/verify
router.get('/verify', isAuthenticated, verify);


// This line is essential. It makes the router available to server.js
module.exports = router;