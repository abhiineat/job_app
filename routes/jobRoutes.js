const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', getJobs); // public
router.post('/', authenticate, createJob); // protected

module.exports = router;
