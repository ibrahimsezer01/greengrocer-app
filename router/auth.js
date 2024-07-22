const express = require('express')
const router = express.Router()
const auth = require("../controllers/auth")

router.get("/register", auth.get_register)

router.post("/register", auth.post_register)

router.get("/login", auth.get_login)

router.post("/login", auth.post_login)

router.get("/logout", auth.get_logout)

module.exports = router