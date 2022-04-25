const { getConnection } = require('../../dbconnections');

const handle_request = (msg, callback) => {
    const { Product } = getConnection();

    Product.findAll(msg)
        .then((data) => {
            callback(null, data);
        })
        .catch((err) => {
            callback(err, null);
        });
};

module.exports = handle_request;
