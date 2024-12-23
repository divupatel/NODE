const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/BlogData');

const db = mongoose.connection;

db.once('open',(err)=>{
    err?console.log("Error in Db Connection",err) : console.log("Db is Connected")
})

module.exports = db;