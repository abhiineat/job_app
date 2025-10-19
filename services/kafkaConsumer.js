const { consumer } = require('./kafka');

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'job_events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Received Kafka Event:', event);
      // Example: Send notification, update cache, etc.
    },
  });

};

module.exports = startConsumer;
