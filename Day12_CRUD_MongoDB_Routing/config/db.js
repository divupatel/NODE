const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/EmpDataNew');

const db = mongoose.connection;

db.once('open', (err) => {
    if (err) {
        console.log('Error connecting to MongoDB', err);
        return false;
    }
    console.log('Connected to MongoDB');
});

module.exports=db;