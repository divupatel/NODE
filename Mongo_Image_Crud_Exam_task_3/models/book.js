const mongoose = require('mongoose');

const multer = require('multer');
const imagePath = '/uploads';
const path = require('path');

BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
})

const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagePath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

BookSchema.statics.uploadImgFile = multer({ storage: storageImage }).single('image');
BookSchema.statics.imgPath = imagePath;

const Books = mongoose.model('Books', BookSchema);

module.exports = Books;