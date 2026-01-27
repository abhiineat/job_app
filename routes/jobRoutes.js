const express = require('express');
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getMyJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

const authMiddleware = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

// 🌍 Public route
router.get('/', getAllJobs);

// 🔐 Protected routes
router.post(
  '/',
  authMiddleware,
  restrictTo('EMPLOYER', 'ADMIN'),
  createJob
);

router.get(
  '/me',
  authMiddleware,
  getMyJobs
);

router.put(
  '/:id',
  authMiddleware,
  restrictTo('EMPLOYER', 'ADMIN'),
  updateJob
);

router.delete(
  '/:id',
  authMiddleware,
  restrictTo('ADMIN'),
  deleteJob
);

module.exports = router;
