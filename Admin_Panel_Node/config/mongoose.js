const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/AdminPanel');

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("Db err",err);
        return false;
    }
    console.log("Db is Connected");
})