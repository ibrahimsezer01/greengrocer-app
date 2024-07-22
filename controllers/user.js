const mailler = require("../helpers/mailler").get_email_text
const { where, Op } = require("sequelize")
const messages = require("../helpers/session_message")
const Products = require("../models/Products")



exports.get_product_details = async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await Products.findOne({ where: { id: productId } })
        return res.render("site/product-details", {
            product: product,
            page_name: "Shop",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_products = async (req, res) => {
    const userId = req.session.userId

    try {
        // const products = await Products.findAll()

        const products = await Products.findAll({
            where: {
                userId: {
                    [Op.not]: userId
                }
            }
        })

        return res.render("site/shop", {
            products: products,
            page_name: "Shop",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_contact = (req, res) => {
    try {
        fullName = req.session.fullName
        email = req.session.email

        const message = req.session.message;
        delete req.session.message;

        return res.render("site/contact", {
            fullName: fullName,
            email: email,
            message: message,
            page_name: "Contact",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_contact = async (req, res) => {
    try {
        const email = req.session.email;
        const subject = req.body.subject;
        const messageText = req.body.message;

        await mailler(email, subject, messageText);
        req.session.message = messages("Mail gönderildi", "success");
        return res.status(201).redirect("/contact");

    } catch (error) {
        console.log(error);
        req.session.message = messages("Bir hata oluştu, lütfen tekrar deneyin.", "danger");
        return res.status(500).redirect("/contact");
    }
};

exports.get_about = (req, res) => {
    try {
        return res.render("site/about", {
            page_name: "About",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_home = (req, res) => {
    try {
        return res.render("site/home", {
            page_name: "Home",
        })
    } catch (error) {
        console.log(error);
    }
}