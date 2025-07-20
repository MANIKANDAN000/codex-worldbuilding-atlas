const express = require('express');
// We need mergeParams: true to access :worldId from the parent router
const router = express.Router({ mergeParams: true }); 
const { createArticle } = require('../controllers/article.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
    .post(createArticle);

module.exports = router;