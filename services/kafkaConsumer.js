const { consumer } = require('./kafka');

const startConsumer = async () => {
  if (!consumer) {
    console.log('🚫 Kafka consumer not initialized (skipping in production)');
    return;
  }

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'job_events', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log('📩 Received Kafka Event:', event);
        // Example: Send notification, update cache, etc.
      },
    });

    console.log('✅ Kafka consumer running locally');
  } catch (error) {
    console.error('❌ Kafka consumer error:', error.message);
  }
};

module.exports = startConsumer;
