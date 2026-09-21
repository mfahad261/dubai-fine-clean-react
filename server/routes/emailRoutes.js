/**
 * emailRoutes — everything mounted under /api.
 * ---------------------------------------------------------------------------
 * One endpoint, because the site has one form. If a careers page or a
 * newsletter box is added later, they get their own controller and a line
 * here — the pattern holds.
 */
import express from 'express';
import { sendContactEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/contact', sendContactEmail);

export default router;
