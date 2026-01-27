
require("dotenv").config({ path: "./.env" });


// require("dotenv").config({ path: "./.env" });
const express = require('express');
const prisma = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const { producer } = require('./services/kafka');
const startConsumer = require('./services/kafkaConsumer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Prisma Express API');
});

const startServer = async () => {
  try {
    if (producer) {
      try {
        await producer.connect();
        console.log(' Kafka Producer connected');
        await startConsumer();
        console.log(' Kafka Consumer connected');
      } catch (kafkaErr) {
        console.warn('Kafka not connected. Skipping Kafka setup.', kafkaErr.message);
      }
    } else {
      console.log('Kafka disabled for this environment');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(' Error starting server:', err);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  if (producer) {
    try {
      await producer.disconnect();
      console.log('Kafka Producer disconnected');
    } catch (err) {
      console.error('Error disconnecting Kafka producer:', err);
    }
  }
  process.exit(0);
});