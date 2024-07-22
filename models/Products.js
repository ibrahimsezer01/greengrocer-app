const DataTypes = require('sequelize');
const sequelize = require('../data/db');

// Ürün modelini tanımlayın
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_public_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = Product;