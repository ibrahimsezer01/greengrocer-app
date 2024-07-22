const DataTypes = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define('User', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  birthday: {
    type: DataTypes.DATEONLY, // Sadece tarih kısmı saklanacak
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // E-posta adresi benzersiz olmalıdır
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// async function users() {
//   await sequelize.sync({ force: true });
//   const user = await User.create({
//     firstName: "İbrahim",
//     lastName: "Sezer",
//     email: "ibosezerpro@gmail.com",
//     password: "1232131213"
//   })
//   console.log(user);
// }
// users()

module.exports = User