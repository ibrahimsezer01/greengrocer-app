const cloudinary = require('cloudinary').v2

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

exports.handleUpload = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        use_filename: true,
        folder: "e-manav"
    })
    return result
}

exports.handleDelete = async (file) => {
    await cloudinary.uploader.destroy(file)
}