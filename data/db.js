const config = require("../config")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: "mysql"
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Baglanti oluşturuldu");
    } catch (error) {
        console.log(error);
    }
}
connection()

module.exports = sequelize