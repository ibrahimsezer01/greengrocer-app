const multer = require("multer")
const cloudinary = require("./cloudinary")

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

module.exports = upload