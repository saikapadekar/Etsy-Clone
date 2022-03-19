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
// const Item = global.DB.define('items', {
//   item_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//   item_name: {
//     type: DataTypes.STRING,
//     unique: false,
//     allowNull: false,
//   },
//   item_category: {
//     type: DataTypes.STRING,
//     unique: false,
//     allowNull: false,
//   },
//   item_description: {
//     type: DataTypes.STRING,
//     unique: false,
//     allowNull: true,
//   },
//   price: {
//     type: DataTypes.INTEGER,
//     unique: false,
//     allowNull: false,
//   },
//   qty_available: {
//     type: DataTypes.INTEGER,
//     unique: false,
//     allowNull: false,
//   },
//   shop_id: {
//     type: DataTypes.INTEGER,
//     unique: false,
//     allowNull: false,
//   },
//   sold: {
//     type: DataTypes.INTEGER,
//     unique: false,
//     allowNull: true,
//   },
// });
// const Shop = global.DB.define('shops', {
//   shop_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//   shop_name: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   owner_details: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
// const Order = global.DB.define('orders', {
//   order_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//    user_id: {
//     type: DataTypes.INTEGER,
//     unique: false,
//     allowNull: false,
//   },
//   order_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   item_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   item_qty: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });
const Customer = global.DB.define('customers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  about: {
    type: DataTypes.STRING,
    },
  gender: {
    type: DataTypes.STRING,
    },
  dob: {
    type: DataTypes.DATEONLY,
    },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  contact_no: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    },
});
const Shop = global.DB.define('shops', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});



const runMigration = async (force) => {
  if (!global.DB) {
    return Promise.reject(new Error('please initialize DB'));
  }
  await User.sync();
  await Customer.sync();
  await Shop.sync();
  return Promise.resolve(global.DB);
};

module.exports = { User,Customer,Shop, runMigration };
