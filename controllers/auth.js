const User = require("../models/User")
const slugfield = require("../helpers/slugField")
const message = require("../helpers/session_message")
const bcrypt = require("bcrypt")
const mailler = require("../helpers/mailler").send_email_text
const jwt = require("jsonwebtoken")

exports.get_register = (req, res) => {
    try {
        const message = req.session.message
        delete req.session.message
        return res.render("site/register", {
            message: message,
            page_name: "Register",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_register = async (req, res) => {
    const { fullName, email, password, birthday } = req.body
    const slug = slugfield(fullName)

    try {
        const checkFullName = await User.findOne({ where: { url: slug } })

        if (checkFullName) {
            req.session.message = message("Bu kullanıcı adı başka biri tarafından kullanılmaktadır", "warning")
            return res.redirect("/register")
        }

        const checkEmail = await User.findOne({ where: { email: email } })

        if (checkEmail) {
            req.session.message = message("Daha önce kayıt olmuşsunuz", "warning")
            req.session.email = email
            return res.redirect("/login")
        }

        if (!checkEmail && !checkFullName) {
            const passwordHash = await bcrypt.hash(password, 10)

            const user = await User.create({
                fullName: fullName,
                email: email,
                password: passwordHash,
                birthday: birthday,
                url: slug
            })

            const token = jwt.sign({ userId: user.id, fullName: user.fullName }, process.env.JWT_KEY)
            await mailler(user.email, "Hesab oluşturma", "Hesabiniz Başariyla oluşturuldu")


            // res.cookie("isAuth", 1)

            req.session.isAuth = true
            req.session.userId = user.id
            req.session.email = user.email
            // res.cookie("jsonwebtoken", token, {
            //     httpOnly: true,
            //     maxAge: 1000 * 60 * 60 * 24
            // })

            return res.redirect("/")
        }

    } catch (error) {
        console.log(error);
        req.session.message = message("Bir hata oluştu, lütfen tekrar deneyin.", "danger");
        return res.status(500).redirect("/login");
    }
}

exports.get_login = (req, res) => {
    try {
        const message = req.session.message
        delete req.session.message
        return res.render("site/login", {
            message: message,
            page_name: "Log in",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            req.session.message = message("Hatalı Bir Email Girişinde Bulundunuz", "warning")
            return res.status(401).redirect("/login");
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            req.session.message = message("Hatalı Parola", "danger")
            return res.status(401).redirect("/login");
        }

        if (user && match) {
            req.session.isAuth = true;
            req.session.userId = user.id
            req.session.fullName = user.fullName
            req.session.email = user.email
            return res.redirect(req.query.returnUrl || "/");
        }

    } catch (error) {
        console.log(error);
        req.session.message = message("Bir hata oluştu, lütfen tekrar deneyin.", "danger");
        return res.status(500).redirect("/login");
    }
}

exports.get_logout = (req, res) => {
    try {
        req.session.destroy()
        return res.redirect("/login")
    } catch (error) {
        console.log(error);
    }
}