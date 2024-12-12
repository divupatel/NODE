const mongoose = require('mongoose');

const RateSchema = mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

const Rate = mongoose.model('User',RateSchema);
module.exports = Rate; 