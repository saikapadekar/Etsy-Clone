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
const Product = global.DB.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  description: {
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
  shopId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
  sold: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true,
  },
});

const Order = global.DB.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
const Buyer = global.DB.define('buyers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
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
    allowNull: true,
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
  owner_details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});
const OrderItem = global.DB.define('orderitems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  shopId: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  notes: {
    type: DataTypes.STRING,
  },
});
// const Favourite = global.DB.define('favourites', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//   productId: {
//     type: DataTypes.INTEGER,
//   },
// });

// Order.hasMany(OrderItem, {
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
// OrderItem.belongsTo(Order);

// Customer.hasMany(Favourite, {
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
// Favourite.belongsTo(Customer);

const runMigration = async (force) => {
  if (!global.DB) {
    return Promise.reject(new Error('please initialize DB'));
  }
  // removeConstraint(Customer,'ReferenceError: queryInterface')
  await User.sync({ force });
  await Buyer.sync({ force });
  await Shop.sync({ force });
  await Product.sync({ force });
  // await Favourite.sync({ force });
  // await Order.sync({ force });
  // await OrderItem.sync({ force });
  return Promise.resolve(global.DB);
};

// module.exports = { User,Customer,Shop,Product,Favourite,Order,OrderItem, runMigration };

module.exports = { User,Buyer,Shop,Product,Order,OrderItem, runMigration };

