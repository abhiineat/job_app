const prisma = require('../db');

// Create job (protected)
exports.createJob = async (req, res) => {
    const { title, description, location, salary } = req.body;
    const userId = req.user.id; // from authMiddleware
  
    // Input validation
    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!description) return res.status(400).json({ error: "Description is required" });
    if (!location) return res.status(400).json({ error: "Location is required" });
    if (!salary) return res.status(400).json({ error: "Salary is required" });
  
    try {
      const job = await prisma.job.create({
        data: {
          title,
          description,
          location,
          salary: parseInt(salary),
          userId,
        },
      });
  
      res.status(201).json({ message: 'Job created successfully', job });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Get all jobs (public)
exports.getAllJobs = async (req, res) => {
    try {
      const jobs = await prisma.job.findMany({
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getMyJobs = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const jobs = await prisma.job.findMany({
        where: { userId },
      });
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, location, salary } = req.body;
    const userId = req.user.id;
  
    try {
      const job = await prisma.job.findUnique({ where: { id: Number(id) } });
      if (!job) return res.status(404).json({ error: 'Job not found' });
      if (job.userId !== userId) return res.status(403).json({ error: 'Not authorized' });
  
      const updatedJob = await prisma.job.update({
        where: { id: Number(id) },
        data: { title, description, location, salary: parseInt(salary) },
      });
  
      res.json({ message: 'Job updated', updatedJob });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const job = await prisma.job.findUnique({ where: { id: Number(id) } });
      if (!job) return res.status(404).json({ error: 'Job not found' });
      if (job.userId !== userId) return res.status(403).json({ error: 'Not authorized' });
  
      await prisma.job.delete({ where: { id: Number(id) } });
      res.json({ message: 'Job deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };