const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    f_name:{
        type:String,
        required:true
    },
    l_name:{
        type:String,
        required:true
    },
    email:{
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

const Student = mongoose.model('User',StudentSchema);
module.exports = Student; 