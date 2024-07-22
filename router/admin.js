const express = require('express')
const router = express.Router()

const admin = require("../controllers/admin")
const upload = require("../helpers/upload")
const isAuth = require("../middlewares/isAuth")



router.get("/dashboard", isAuth, admin.get_dashboard)

router.get("/admin/product/:productId", isAuth, admin.get_product_update)

router.post("/admin/:productId", isAuth, admin.post_product_update)

router.get("/admin/delete/:productId", isAuth, admin.get_product_delete)

router.post("/admin/delete/:productId", isAuth, admin.post_product_delete)

router.get("/products", isAuth, admin.get_products_create)

router.post("/products", isAuth, upload.single("images"), admin.post_product_create)


module.exports = router