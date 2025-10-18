// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getMyJobs, updateJob, deleteJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route
router.get('/', getAllJobs);

// Protected routes
router.post('/', authMiddleware, createJob);
router.get('/me', authMiddleware, getMyJobs);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;