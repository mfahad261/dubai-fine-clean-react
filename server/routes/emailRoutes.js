/**
 * emailRoutes — everything mounted under /api.
 * ---------------------------------------------------------------------------
 * One endpoint, because the site has one form. If a careers page or a
 * newsletter box is added later, they get their own controller and a line
 * here — the pattern holds.
 */
const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.post('/contact', emailController.sendContactEmail);

module.exports = router;
