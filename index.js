// express
const express = require('express')
const app = express()

// dotenv
const dotenv = require("dotenv")
dotenv.config()

// node modules
const cookieParser = require('cookie-parser')
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// custom modules
const sequelize = require("./data/db")
const locals = require("./middlewares/locals")

// engine
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: new SequelizeStore({
        db: sequelize,
    })
}))
app.use(locals)


// static files
app.use(express.static('public'))
app.use('/libs', express.static('node_modules'));

// const ctg = require("./data/categories-data")
// ctg()

// models
const Categories = require("./models/Categories")
const Products = require("./models/Products")
const User = require("./models/User")

// İlişkiler
Categories.hasMany(Products, {
    foreignKey: {
        name: "CategoryId",
        allowNull: false,
    }
});
Products.belongsTo(Categories);

User.hasMany(Products, {
    foreignKey: {
        name: "userId",
        allowNull: false
    }
});

// router
const user = require("./router/user")
const admin = require("./router/admin")
const auth = require("./router/auth")
app.use(admin)
app.use(auth)
app.use(user)

const port = 3575 || process.env.PORT
app.listen(port, () => console.log(`App listening on http://localhost:${port}`))