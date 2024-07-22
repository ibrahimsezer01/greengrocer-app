const express = require('express')
const router = express.Router()

const user = require("../controllers/user")
const isAuth = require("../middlewares/isAuth")

router.get("/shop/product/:productId", isAuth, user.get_product_details)

router.get("/shop", isAuth, user.get_products)

router.get("/contact", isAuth, user.get_contact)

router.post("/contact", isAuth, user.post_contact)

router.get("/about", isAuth, user.get_about)

router.get("/", user.get_home)

module.exports = router