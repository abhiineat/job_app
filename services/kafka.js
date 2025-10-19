// services/kafka.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'job-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'job-group' });

module.exports = { producer, consumer };
