const jwt = require('jsonwebtoken');
const { User } = require('../model');

const JWT_SECRET = 'myetsysuperdupersecret';

const validate = async (token) => {
    var decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.id;
    console.log(decoded)

    const user = await User.findOne({  _id: userId  });
    if (!user) {
        return false;
    }

    return {user: decoded.id, role: decoded.role, valid: true};
};

module.exports = validate;
