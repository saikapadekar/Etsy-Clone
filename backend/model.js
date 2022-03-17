const { DataTypes } = require('sequelize');

const User = global.DB.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('customer', 'owner'),
  },
});
const Item = global.DB.define('items', {
  item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  item_name: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  item_category: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  item_description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
  qty_available: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
});
const runMigration = async (force) => {
  if (!global.DB) {
    return Promise.reject(new Error('please initialize DB'));
  }
  await User.sync({ force });
  return Promise.resolve(global.DB);
};

module.exports = { User, runMigration };
