const { Kafka } = require('kafkajs');

let producer = null;
let consumer = null;

if (process.env.NODE_ENV !== 'production') {
  // Local development (Kafka via Docker)
  const kafka = new Kafka({
    clientId: 'job-app',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  producer = kafka.producer();
  consumer = kafka.consumer({ groupId: 'job-group' });

  console.log('✅ Kafka initialized locally');
} else {
  // Skip Kafka setup in production
  console.log('🚫 Skipping Kafka initialization in production (Railway deploy)');
}

module.exports = { producer, consumer };
