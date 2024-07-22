const Categories = require("../models/Categories")
const Products = require("../models/Products")
const User = require("../models/User")
const sequelize = require("./db")


async function categories() {
    try {
        await sequelize.sync({ force: true });

        const categories = [
            { name: "Sebzeler" },
            { name: "Meyveler" },
            { name: "Et Ürünleri" },
            { name: "Süt Ürünleri" },
            { name: "İçecekler" },
            { name: "Ekmek ve Fırın Ürünleri" },
            { name: "Kuru Gıdalar" },
            { name: "Atıştırmalıklar" }
        ];
        

        const createdCategories = await Promise.all(categories.map(category => {
            return Categories.create(category);
        }));

    } catch (error) {
        console.error('Kategoriler oluşturulurken bir hata oluştu:', error);
    }
}

module.exports = categories