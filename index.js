require("dotenv").config({ path: "./.env" });
const express = require('express');
const prisma = require('./db');
const app = express();
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const { producer } = require('./services/kafka');
console.log("✅ Producer loaded:", !!producer);
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
      await producer.connect();
      console.log('Kafka Producer connected');
      await startConsumer();
    console.log('✅ Kafka Consumer connected');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
      console.error(' Failed to connect Kafka producer', err);
    }
  };
  
  startServer();
  process.on('SIGINT', async () => {
    console.log('\n Shutting down gracefully...');
    try {
      await producer.disconnect();
      console.log('Kafka Producer disconnected');
    } catch (err) {
      console.error(' Error disconnecting producer:', err);
    } finally {
      process.exit(0);
    }
  });