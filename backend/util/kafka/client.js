/* eslint-disable global-require */
/* eslint-disable camelcase */
const rpc = new (require('./kafkarpc'))();

// make request to kafka
function makeRequest(queue_name, msg_payload, callback) {
  console.log('SENT TO KAFKA');
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, (err, response) => {
    callback(null, response);

  });
}

exports.makeRequest = makeRequest;
