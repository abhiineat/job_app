// services/kafka.js
const { Kafka } = require('kafkajs');
const isProd = process.env.NODE_ENV === 'production';
let producer = null;
let consumer = null;

if (isProd ||process.env.DISABLE_KAFKA === 'true') {
  console.log('⚠️ Kafka disabled for this environment');
} else if (process.env.KAFKA_BROKER) {
  try {
    const kafka = new Kafka({
      clientId: 'job-app',
      brokers: [process.env.KAFKA_BROKER],
    });

    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: 'job-group' });
    console.log('✅ Kafka initialized with broker:', process.env.KAFKA_BROKER);
  } catch (err) {
    console.warn('🚫 Kafka initialization failed:', err.message);
  }
} else {
  console.log('⚠️ No Kafka broker found — skipping Kafka initialization');
}

module.exports = { producer, consumer };
