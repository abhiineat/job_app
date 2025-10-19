// services/kafka.js
const { Kafka } = require('kafkajs');

let producer = null;
let consumer = null;

try {
  // Only initialize Kafka if KAFKA_BROKER exists (for Railway safety)
  if (process.env.KAFKA_BROKER) {
    const kafka = new Kafka({
      clientId: 'job-app',
      brokers: [process.env.KAFKA_BROKER],
    });

    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: 'job-group' });
    console.log('✅ Kafka initialized with broker:', process.env.KAFKA_BROKER);
  } else {
    console.log('⚠️ No Kafka broker found — skipping Kafka initialization');
  }
} catch (err) {
  console.warn('🚫 Kafka initialization failed:', err.message);
}

module.exports = { producer, consumer };
