const DataTypes = require('sequelize');
const sequelize = require('../data/db');

const Categories = sequelize.define('Categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Categories