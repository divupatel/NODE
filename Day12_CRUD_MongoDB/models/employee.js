const mongoose = require('mongoose');

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
})

const Employee = mongoose.model('Employee',EmploeeSchema);
module.exports = Employee; 