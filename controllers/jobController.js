const prisma = require('../db');
const { producer } = require('../services/kafka');
const redis = require('../config/redisClient');

// ✅ Create Job (Protected)
exports.createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;
  const userId = req.user.id;

  if (!title || !description || !location || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }

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

    await redis.del('jobs:all');

    // ✅ Kafka-safe send (skip gracefully in production)
    if (producer) {
      try {
        await producer.connect();
        await producer.send({
          topic: 'job_events',
          messages: [{ value: JSON.stringify({ type: 'JOB_CREATED', data: job }) }],
        });
        console.log('📤 Kafka message sent:', job.id);
      } catch (kafkaErr) {
        console.warn('⚠️ Kafka send skipped:', kafkaErr.message);
      }
    } else {
      console.log('🚫 Kafka not connected — skipping message send');
    }

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    console.error('❌ Job creation failed:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Jobs (Public)
exports.getAllJobs = async (req, res) => {
  try {
    const cacheKey = 'jobs:all';
    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const jobs = await prisma.job.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    await redis.set(cacheKey, JSON.stringify(jobs), { EX: 60 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get My Jobs (Protected)
exports.getMyJobs = async (req, res) => {
  const userId = req.user.id;
  try {
    const jobs = await prisma.job.findMany({ where: { userId } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Job
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

    await redis.del('jobs:all');
    res.json({ message: 'Job updated', updatedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Job
exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const job = await prisma.job.findUnique({ where: { id: Number(id) } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.userId !== userId) return res.status(403).json({ error: 'Not authorized' });

    await prisma.job.delete({ where: { id: Number(id) } });
    await redis.del('jobs:all');
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
