const express = require('express');
const port = 8000;
const path = require('path')
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/',require('./routes/adminRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is running on the port :",port)
});
