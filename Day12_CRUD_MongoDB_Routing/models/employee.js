const mongoose = require('mongoose');

const multer = require('multer');
const imagePath = '/uploads';
const path = require('path');

const EmploeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{ 
        type:String, 
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const storageImage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

EmploeeSchema.statics.uploadImageFile = multer({storage:storageImage}).single('image');
EmploeeSchema.statics.imgPath = imagePath;

const Employee = mongoose.model('Employee',EmploeeSchema);
module.exports = Employee; 