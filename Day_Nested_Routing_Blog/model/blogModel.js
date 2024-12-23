const mongoose = require('mongoose');
const path = require('path');
const imagePath = '/uploads/blogImages';
const multer = require('multer');

const BlogSchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    blogDate : {
        type : String,
        required : true
    }
})

const imageStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    },
})

BlogSchema.statics.uploadBlogImage = multer({storage:imageStorage}).single('image');
BlogSchema.statics.imgPath = imagePath;


const Blog = mongoose.model('Blog',BlogSchema);
module.exports = Blog;