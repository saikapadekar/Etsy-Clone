const { getConnection } = require('../../dbconnections');

const handle_request = (msg, callback) => {
  const { Order } = getConnection();

  Order.create(msg)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = handle_request;
