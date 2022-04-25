require('./config');
var connection = new require('./kafka/connection');
var createOrder = require('./services/order/create');
var listOrders = require('./services/order/list');
var createProduct = require('./services/product/create');
var listProducts = require('./services/product/list');

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', (message) => {
    console.log('MESSAGE RECEIVED FOR ' + topic_name);
    console.log(message.value);
    try {
      var data = JSON.parse(message.value);

      fname(data.data, (err, res) => {
        var payloads = [
          {
            topic: 'response_topic',
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, function (err, data) {
          console.log('SENT DATA FROM KAFKA BACKEND: ', JSON.stringify(res));
        });
        return;
      });
    } catch (e) {
      console.error(e);
    }
  });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest('order.create', createOrder);
handleTopicRequest('order.list', listOrders);
handleTopicRequest('product.search', listProducts);
handleTopicRequest('product.create', createProduct);
