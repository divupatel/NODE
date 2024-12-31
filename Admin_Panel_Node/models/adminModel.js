const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const imagePath = '/uploads/adminImage';

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
},
    {timestamps : true}
)

const storeImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    },
})

AdminSchema.statics.uploadAdminImg = multer({storage : storeImage}).single('image');
AdminSchema.statics.imgPath = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;