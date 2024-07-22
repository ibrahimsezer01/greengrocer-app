const Products = require("../models/Products")
const Categories = require("../models/Categories")
const cloudinary = require("../helpers/cloudinary")
const Product = require("../models/Products")
const mailler = require("../helpers/mailler").send_email_text

exports.get_dashboard = async (req, res) => {

    const id = req.session.userId
    const fullName = req.session.fullName

    try {
        const products = await Products.findAll({
            where: { userId: id }
        })

        return res.render("site/dashboard", {
            page_name: "Dashboard",
            products: products,
            fullName: fullName
        })

    } catch (error) {
        console.log(error);
    }
}

exports.get_product_update = async (req, res) => {
    const productId = req.params.productId

    try {
        const categories = await Categories.findAll()
        const product = await Products.findOne({ where: { id: productId } })

        return res.render("site/admin-product-update", {
            product: product,
            categories: categories,
            page_name: "Shop",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_product_update = async (req, res) => {
    const productId = req.params.productId
    const userId = req.session.userId
    const { name, price, description, stock, CategoryId } = req.body

    try {
        const product = await Products.findOne({
            where: { id: productId, userId: userId }
        })

        if (!product) {
            return res.status(404).redirect(`/dashboard/product/${productId}`)
        }

        await Products.update({
            name: name,
            price: price,
            description: description,
            stock: stock,
            CategoryId: CategoryId
        }, {
            where: { id: productId, userId: userId }
        });

        return res.status(201).redirect("/dashboard")

    } catch (error) {
        console.log(error);
    }
}

exports.get_product_delete = async (req, res) => {
    const id = req.params.productId
    
    try {

        const product = await Products.findOne({ where: { id: id } })

        return res.render("site/admin-product-delete", {
            product: product,
            page_name: "Delete Product",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_product_delete = async (req, res) => {
    const userId = req.session.userId
    const id = req.params.productId

    try {
        const product = await Product.findOne({
            where: { id: id, userId: userId}
        })

        if (!product) {
            return res.status(404).redirect(`/dashboard`)
        }

        await Products.destroy({
            where: { id: id, userId: userId }
        });

        return res.status(201).redirect("/dashboard")

    } catch (error) {
        console.log(error);
    }
}

exports.get_products_create = async (req, res) => {
    try {
        const categories = await Categories.findAll()
        res.render("site/admin-product-create", {
            page_name: "Products",
            categories: categories
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_product_create = async (req, res) => {
    const { name, price, description, stock, CategoryId } = req.body
    const images = req.file
    const userId = req.session.userId
    const email = req.session.email

    try {
        const image = await cloudinary.handleUpload(images.path)

        const product = await Products.create({
            name: name,
            price: price,
            description: description,
            CategoryId: CategoryId,
            stock: stock,
            image_public_id: image.public_id,
            image_url: image.url,
            userId: userId
        })

        if (product) {
            // await mailler(email, "Ürün Ekleme", "İşleminiz başarıyla sonuçlanmıştır iyi günler dileriz")
            return res.redirect("/dashboard")
        }

    } catch (error) {
        console.log(error);
    }
}