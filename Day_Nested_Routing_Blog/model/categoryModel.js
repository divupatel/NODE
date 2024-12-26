const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    },
    categoryDate : {
        type : String,
        required : true
    }
})

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;