const prisma = require('../db');

// Create job (protected)
exports.createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;
  const userId = req.user.id; // from authMiddleware
  try {
    const job = await prisma.job.create({
      data: { title, description, location, salary: parseInt(salary), userId },
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs (public)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({ include: { user: true } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
