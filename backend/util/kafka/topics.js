const kafka = require('kafka-node');

const createKafkaTopics = () => {
  const client = new kafka.KafkaClient({
    kafkaHost: "kafka:9092",
  });
  const admin = new kafka.Admin(client);
  admin.createTopics(
    [
      {
        topic: 'response_topic',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'order.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'order.list',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'order.delete',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'product.search',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'product.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'product.update',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'produce.delete',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'favourite.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'favourite.delete',
        partitions: 1,
        replicationFactor: 1,
      },
    ],
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
};

module.exports = {
  createKafkaTopics,
};
